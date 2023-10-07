#version 330 compatibility

uniform sampler2D uImageUnit;
uniform float uSc;
uniform float uTc;
uniform float uDs;
uniform float uDt;
uniform float uMagFactor;
uniform float uRotAngle;
uniform float uSharpFactor;
uniform bool uUseCircle;
uniform float uRadius;

in vec2 vST;

void
main( )
{
    float s,t;
    vec4 newcolor;

    if (!uUseCircle)
    {
        if (vST.s >= uSc-uDs/2. && vST.s <= uSc+uDs/2. && vST.t >= uTc-uDt/2. && vST.t <= uTc+uDt/2.)
        {
            s = vST.s - uSc;
            t = vST.t - uTc;
            
            s = uMagFactor*s;
            t = uMagFactor*t;
            
            float srecord = s;
            float trecord = t;
            s = srecord *cos(uRotAngle) - trecord *sin(uRotAngle);
            t = srecord*sin(uRotAngle) + trecord*cos(uRotAngle);
            
            s = s + uSc;
            t = t + uTc;

            vec2 vSTn = vec2(s,t);

            //ivec2 ires = textureSize( uImageUnit, 0 );
            float ResS = float( s );
            float ResT = float( t );

            vec2 stp0 = vec2(1./ResS, 0. );
            vec2 st0p = vec2(0. , 1./ResT);
            vec2 stpp = vec2(1./ResS, 1./ResT);
            vec2 stpm = vec2(1./ResS, -1./ResT);

            vec3 i00 = texture2D( uImageUnit, vSTn ).rgb;
            vec3 im1m1 = texture2D( uImageUnit, vSTn-stpp ).rgb;
            vec3 ip1p1 = texture2D( uImageUnit, vSTn+stpp ).rgb;
            vec3 im1p1 = texture2D( uImageUnit, vSTn-stpm ).rgb;
            vec3 ip1m1 = texture2D( uImageUnit, vSTn+stpm ).rgb;
            vec3 im10 = texture2D( uImageUnit, vSTn-stp0 ).rgb;
            vec3 ip10 = texture2D( uImageUnit, vSTn+stp0 ).rgb;
            vec3 i0m1 = texture2D( uImageUnit, vSTn-st0p ).rgb;
            vec3 i0p1 = texture2D( uImageUnit, vSTn+st0p ).rgb;
            vec3 target = vec3(0.,0.,0.);

            target += 1.*(im1m1+ip1m1+ip1p1+im1p1);
            target += 2.*(im10+ip10+i0m1+i0p1);
            target += 4.*(i00);
            target /= 16.;

            newcolor =  vec4(mix(target, texture2D(uImageUnit, vec2(s,t)).xyz, uSharpFactor),1.);

               
        }    
        else
        {
            s = vST.s;
            t = vST.t;
            newcolor =  texture2D(uImageUnit, vec2(s,t));
        }
    }
    else 
    {
        if (((vST.s- uSc)*(vST.s- uSc) + (vST.t- uTc)*(vST.t- uTc)) <= uRadius*uRadius)
        {
            s = vST.s - uSc;
            t = vST.t - uTc;
            
            s = uMagFactor*s;
            t = uMagFactor*t;
            
            float srecord = s;
            float trecord = t;
            s = srecord *cos(uRotAngle) - trecord *sin(uRotAngle);
            t = srecord*sin(uRotAngle) + trecord*cos(uRotAngle);
            
            s = s + uSc;
            t = t + uTc;
            
            vec2 vSTn = vec2(s,t);
            ivec2 ires = textureSize( uImageUnit, 0 );
            float ResS = float( s );
            float ResT = float( t );

            vec2 stp0 = vec2(1./ResS, 0. );
            vec2 st0p = vec2(0. , 1./ResT);
            vec2 stpp = vec2(1./ResS, 1./ResT);
            vec2 stpm = vec2(1./ResS, -1./ResT);

            vec3 i00 = texture2D( uImageUnit, vSTn ).rgb;
            vec3 im1m1 = texture2D( uImageUnit, vSTn-stpp ).rgb;
            vec3 ip1p1 = texture2D( uImageUnit, vSTn+stpp ).rgb;
            vec3 im1p1 = texture2D( uImageUnit, vSTn-stpm ).rgb;
            vec3 ip1m1 = texture2D( uImageUnit, vSTn+stpm ).rgb;
            vec3 im10 = texture2D( uImageUnit, vSTn-stp0 ).rgb;
            vec3 ip10 = texture2D( uImageUnit, vSTn+stp0 ).rgb;
            vec3 i0m1 = texture2D( uImageUnit, vSTn-st0p ).rgb;
            vec3 i0p1 = texture2D( uImageUnit, vSTn+st0p ).rgb;
            vec3 target = vec3(0.,0.,0.);

            target += 1.*(im1m1+ip1m1+ip1p1+im1p1);
            target += 2.*(im10+ip10+i0m1+i0p1);
            target += 4.*(i00);
            target /= 16.;

            newcolor =  vec4(mix(target, texture2D(uImageUnit, vec2(s,t)).xyz, uSharpFactor),1.);
               
        }    
        else
        {
            s = vST.s;
            t = vST.t;
            newcolor =  texture2D(uImageUnit, vec2(s,t));
        }
    }


    gl_FragColor = newcolor;
}