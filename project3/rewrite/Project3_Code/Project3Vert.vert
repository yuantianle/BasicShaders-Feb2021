#version 330 compatibility

//out vec4 vColor; 
out float vX, vY;
uniform float uK;
uniform float uA;
uniform sampler3D Noise3;
uniform float uNoiseFreq;
uniform float uNoiseAmp;

float PI = 3.1415926;
float Y0 = 1.;

uniform float uLightX, uLightY, uLightZ;

flat out vec3 vNf;
out vec3 vNs;
flat out vec3 vLf;
out vec3 vLs;
flat out vec3 vEf;
out vec3 vEs;

vec3 eyeLightPosition = vec3(uLightX, uLightY, uLightZ);

const vec3 LIGHTPOS   = vec3( -2., 0., 10. );

vec3
RotateNormal( float angx, float angy, vec3 n )
{
        float cx = cos( angx );
        float sx = sin( angx );
        float cy = cos( angy );
        float sy = sin( angy );

        // rotate about x:
        float yp =  n.y*cx - n.z*sx;    // y'
        n.z      =  n.y*sx + n.z*cx;    // z'
        n.y      =  yp;
        // n.x      =  n.x;

        // rotate about y:
        float xp =  n.x*cy + n.z*sy;    // x'
        n.z      = -n.x*sy + n.z*cy;    // z'
        n.x      =  xp;
        // n.y      =  n.y;

        return normalize( n );
}

float
Sinc( float r, float k )
{
	if( r == 0. )
		return 1.;
	return sin(r*k) / (r*k);
}

float
DerivSinc( float r, float k )
{
	if( r == 0. )
		return 0;
	return ( r*k*cos(r*k) - sin(r*k) ) / ( r*k*r*k );
}

void
main( )
{
	float r = length( gl_Vertex.xy );
	float z = uA * Sinc( r, uK );
	vec4 newVertex = vec4(gl_Vertex.xy, z, 1.);

	float dzdr = uA * DerivSinc( r, uK );
	float drdx = newVertex.x / r;
	float drdy = newVertex.y / r;
	float dzdx = dzdr * drdx;
	float dzdy = dzdr * drdy;
	vec3 Tx = vec3(1., 0., dzdx );
	vec3 Ty = vec3(0., 1., dzdy );

	vec3 newNormal = normalize( cross( Tx, Ty ) );

	vec4 nvx = texture( Noise3, uNoiseFreq*newVertex.xyz);
	float angx = nvx.r + nvx.g + nvx.b + nvx.a  -  2.;
	angx *= uNoiseAmp;

    vec4 nvy = texture( Noise3, uNoiseFreq*vec3(newVertex.xy,newVertex.z+0.5) );
	float angy = nvy.r + nvy.g + nvy.b + nvy.a  -  2.;
	angy *= uNoiseAmp;

	newNormal = RotateNormal(angx,angy,newNormal);

	vec3 ECposition = vec3( gl_ModelViewMatrix * newVertex );
	vNf = normalize( gl_NormalMatrix * newNormal );
	vNs = vNf;

	vLf = eyeLightPosition - ECposition;
	vLs = vLf;

	vEf = vec3(0., 0., 0.) - ECposition;
	vEs = vEf;

	//vColor = gl_Color.rgba; 
	//vS = gl_MultiTexCoord0.s;
	//vT = gl_MultiTexCoord0.t;
	


	gl_Position = gl_ModelViewProjectionMatrix * newVertex;
}