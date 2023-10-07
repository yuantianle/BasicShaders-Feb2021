#version 330 compatibility

//out float vX, vY;
//uniform float uK;
//uniform float uP;
//uniform sampler3D Noise3;
//uniform float uNoiseFreq;
//uniform float uNoiseAmp;

float PI = 3.1415926;
float Y0 = 1.;

//uniform float uLightX, uLightY, uLightZ;

//flat out vec3 vNf;
//out vec3 vNs;
//flat out vec3 vLf;
//out vec3 vLs;
//flat out vec3 vEf;
//out vec3 vEs;

//vec3 eyeLightPosition = vec3(uLightX, uLightY, uLightZ);

const vec3 LIGHTPOS   = vec3( -2., 0., 10. );

//vec3
//RotateNormal( float angx, float angy, vec3 n )
//{
//        float cx = cos( angx );
//        float sx = sin( angx );
//        float cy = cos( angy );
//        float sy = sin( angy );
//
//        // rotate about x:
//        float yp =  n.y*cx - n.z*sx;    // y'
//        n.z      =  n.y*sx + n.z*cx;    // z'
//        n.y      =  yp;
//        // n.x      =  n.x;
//
//        // rotate about y:
//        float xp =  n.x*cy + n.z*sy;    // x'
//        n.z      = -n.x*sy + n.z*cy;    // z'
//        n.x      =  xp;
//        // n.y      =  n.y;
//
//        return normalize( n );
//}

void
main( )
{	
	//vX = gl_Vertex.x;
	//vY = gl_Vertex.y;
	//
	////float z =  uK*(Y0 -vY) * sin(2. * PI * vX/uP);
	//float z = gl_Vertex.z;
	//vec4 Vertex = vec4(gl_Vertex.xy, z, 1.);
	//
	//float dzdx = uK*(Y0 -vY) * (2.*PI/uP) * cos(2. * PI * vX/uP);
	//float dzdy = -uK*sin(2.*PI*vX/uP);
	//vec3 Tx = vec3 (1., 0., dzdx);
	//vec3 Ty = vec3 (0., 1., dzdy);
	//vec3 vNormal = cross(Tx,Ty);
	//
	//vec4 nvx = texture( Noise3, uNoiseFreq*Vertex.xyz);
	//float angx = nvx.r + nvx.g + nvx.b + nvx.a  -  2.;
	//angx *= uNoiseAmp;
	//
    //vec4 nvy = texture( Noise3, uNoiseFreq*vec3(Vertex.xy,Vertex.z+0.5) );
	//float angy = nvy.r + nvy.g + nvy.b + nvy.a  -  2.;
	//angy *= uNoiseAmp;
	//
	//vNormal = RotateNormal(angx,angy,vNormal);
	//
	//vec3 ECposition = vec3( gl_ModelViewMatrix * Vertex );
	//vNf = normalize( gl_NormalMatrix * vNormal );
	//vNs = vNf;
	//
	//vLf = eyeLightPosition - ECposition;
	//vLs = vLf;
	//
	//vec4 EyeCoords = inverse(gl_ModelViewMatrix) * vec4(-4,2,4,1);
	//vEf = EyeCoords.xyz  - ECposition;
	//vEs = vEf;
	


	gl_Position =  gl_ModelViewMatrix*gl_Vertex;
}