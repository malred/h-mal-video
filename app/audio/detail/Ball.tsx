import {Canvas} from "@react-three/fiber";
import {
    Decal,
    Float,
    OrbitControls,
    Preload,
    useTexture,
} from "@react-three/drei";

export default function Ball(props) {
    // 纹理
    const [decal] = useTexture([props.imgUrl]);

    return (
        <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
            {/* 环境光 */}
            <ambientLight intensity={0.25}/>
            <directionalLight position={[0, 0, 0.05]}/>
            {/*<mesh castShadow receiveShadow scale={2.75}>*/}
            <mesh castShadow receiveShadow scale={2.25}>
                {/* 20面体 */}
                <icosahedronBufferGeometry args={[1, 1]}/>
                <meshStandardMaterial
                    color={"#fff8eb"}
                    polygonOffset
                    polygonOffsetFactor={-5}
                    flatShading
                />
                <Decal
                    map={decal}
                    position={[0, 0, 1]}
                    rotation={[2 * Math.PI, 0, 6.25]}
                    flatShading
                />
            </mesh>
        </Float>
    );
};