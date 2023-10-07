#version 330 compatibility

uniform float uAd; 
uniform float uBd;
uniform float uTol;

uniform float uAlpha; 

//in float vX, vY; 
//in float vS, vT;

uniform float uKa, uKd, uKs;
uniform vec4 uColor;
uniform vec4 uSpecularColor;
uniform float uShininess;
uniform bool uFlat;

flat in vec3 vNf;
in vec3 vNs;
flat in vec3 vLf;
in vec3 vLs;
flat in vec3 vEf;
in vec3 vEs;


void 
main( ) 
{
	vec3 Normal;
	vec3 Light;
	vec3 Eye;
	
	if(uFlat)
	{
		Normal = normalize(vNf);
		Light = normalize(vLf);
		Eye = normalize(vEf);
	}
	else
	{
		Normal = normalize(vNs);
		Light = normalize(vLs);
		Eye = normalize(vEs);
	}
	vec4 ambient = uKa*uColor;
	
	float d = max(dot(Normal,Light), 0.);
	vec4 diffuse = uKd*d*uColor;
	
	float s = 0.;
	if(dot(Normal,Light) > 0.)
	{
		vec3 ref = normalize(2. * Normal * dot(Normal,Light) - Light);
		s = pow(max(dot(Eye,ref), 0.), uShininess);
	}
	
	vec4 specular = uKs*s*uSpecularColor;
	

	//float df = max(0.0, dot(Normal, Light));
	float df = dot(Normal, Light);
	if (df < 0.1)
        df = 0.0;
    else if (df < 0.2)
        df = 0.2;
    else if (df < 0.4)
        df = 0.4;
    else if (df < 0.6)
        df = 0.6;
    else if (df < 0.8)
        df = 0.8;
    else
        df = 1.0;

	float silhouette =length(Normal * vec3(0.0, 0.0, 1.0));// dot(Normal, Eye);
    if (abs(silhouette) < 0.3) {
		silhouette = 0;
		gl_FragColor = vec4(silhouette, silhouette, silhouette, 1.0);
    }
    else {
		gl_FragColor = vec4(ambient.rgb + df*diffuse.rgb+ specular.rgb , 1.);
    }
	
	//gl_FragColor = vec4(ambient.rgb + df*diffuse.rgb+ specular.rgb , 1.);
//
//--------------------------------------------------------------------------------------------------	
	

	//vec2 vST = vec2(vS,vT);
	//vec4 nv  = texture2D( Noise2, uNoiseFreq* vST );
	//float n = nv.r + nv.g + nv.b + nv.a;    //  1. -> 3.
	//n = n - 2.;                             // -1. -> 1.
	//n *= uNoiseAmp;
	//
	//
	//float Ar = uAd/2.; 
	//float Br = uBd/2.; 
	//int numins = int( vS / uAd ); 
	//int numint = int( vT / uBd ); 
	//float sc = numins *uAd + Ar;
	//float tc = numint *uBd + Br;
	//float ds = vS -sc;
	//float dt = vT -tc;
	//float oldDist = sqrt( ds*ds + dt*dt );
	//float newDist = oldDist + n;
	//float scale = newDist/oldDist;
	//ds *= scale;
	//dt *= scale;
	//
	//float d = (ds)*(ds)/(Ar*Ar) + (dt)*(dt)/(Br*Br); 
	////float dfrac = fract(d);
	//
	////float t = smoothstep( 0.5-uP-uTol, 0.5-uP+uTol, rfrac ) - smoothstep( 0.5+uP-uTol, 0.5+uP+uTol, rfrac );
	//float t = smoothstep( 1.-uTol, 1.+uTol, d );
	//
	//vec3 m = mix( WHITE, vColor, t ); 
	//if (m == vec3(1,1,1)) 
	//	if (uAlpha == 0)
	//		discard;
	//	else gl_FragColor = vec4(vLightIntensity * m ,uAlpha);
	//else gl_FragColor = vec4(vLightIntensity * m ,1);

}
