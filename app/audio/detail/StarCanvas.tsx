import {Suspense, useRef} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {PointMaterial, Points, Preload, Sky} from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import {useTheme} from "next-themes";

const Stars = (props) => {
    const ref = useRef();
    // 创建粒子
    const sphere = random.inSphere(new Float32Array(5000), {radius: 1.2});
    // 旋转动画
    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });
    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const StarsCanvas = (props) => {

    const { theme, setTheme } = useTheme("dark");

    return (
        <div className="w-full h-auto absolute inset-0 z-[-1]">
            <Canvas camera={{position: [0, 0, 1]}}>
                <Suspense fallback={null}>
                    {/*{props.dark ? <Stars/> :*/}
                    {theme === "dark" ? <Stars/> :
                        <Sky
                            // sunPosition={sunPosition} // 太阳位置
                        />}
                </Suspense>
                <Preload all/>
            </Canvas>
        </div>
    );
};
export default StarsCanvas;
