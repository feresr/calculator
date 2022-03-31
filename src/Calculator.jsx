import React, { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, PositionalAudio, Text } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const [display, setDisplay] = useState(0);
  const [base, setBase] = useState([]);
  const [current, setCurrent] = useState(0);
  const [opValue, setOpValue] = useState(0);
  const [op, setOp] = useState("");
  const { nodes, materials } = useGLTF("./calculator/scene-fixed.glb");

  function numberPressed(n) {
    const v = current * 10 + parseInt(n);
    setCurrent(v);
    setDisplay(v);
  }

  useEffect(() => {}, [op]);

  function add(operation) {
    setCurrent(0);
    let b = base;
    if (current != 0) {
      b = base.concat(current);
    }
    setBase(b);
    setOp(operation);
    operate(operation);
  }

  function operate(op) {
    console.log(base);
    if (base.length == 0) return;
    let n = base.reduce((acc, i) => {
      switch (op) {
        case "plus": {
          acc += i;
          break;
        }
        case "-": {
          acc -= i;
          break;
        }
        case "=": {
        }
        default: {
        }
      }
    });
    console.log("n is:" + n);
    setDisplay(n);
    setBase([n]);
  }

  useEffect(() => {}, [op]);

  function clear(op) {
    setDisplay(0);
    setBase([]);
    setOp("");
    setCurrent(0);
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={5}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              geometry={nodes.calc_low_calc_0.geometry}
              material={nodes.calc_low_calc_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              geometry={nodes.calc003_low_calc_0.geometry}
              material={nodes.calc003_low_calc_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <Button nodes={nodes} k={"-"} onClick={add} />
            <Button nodes={nodes} k={"dot"} />
            <mesh
              geometry={nodes["div"].geometry}
              material={nodes["div"].material}
            />
            <Button nodes={nodes} k={"0"} onClick={numberPressed} />
            <Button nodes={nodes} k={"1"} onClick={numberPressed} />
            <Button nodes={nodes} k={"2"} onClick={numberPressed} />
            <Button nodes={nodes} k={"3"} onClick={numberPressed} />
            <Button nodes={nodes} k={"4"} onClick={numberPressed} />
            <Button nodes={nodes} k={"5"} onClick={numberPressed} />
            <Button nodes={nodes} k={"6"} onClick={numberPressed} />
            <Button nodes={nodes} k={"7"} onClick={numberPressed} />
            <Button nodes={nodes} k={"8"} onClick={numberPressed} />
            <Button nodes={nodes} k={"9"} onClick={numberPressed} />
            <Button nodes={nodes} k={"="} onClick={add} />
            <mesh geometry={nodes.cal.geometry} material={nodes.cal.material} />
            <mesh
              geometry={nodes["m+="].geometry}
              material={nodes["m+="].material}
            />
            <mesh
              geometry={nodes["m-"].geometry}
              material={nodes["m-"].material}
            />
            <mesh geometry={nodes.mc.geometry} material={nodes.mc.material} />
            <mesh geometry={nodes.mu.geometry} material={nodes.mu.material} />

            <Button nodes={nodes} k={"on"} onClick={clear} />
            <Button nodes={nodes} k={"plus"} onClick={add} />
            <mesh
              geometry={nodes.send.geometry}
              material={nodes.send.material}
            />
            <mesh geometry={nodes.x.geometry} material={nodes.x.material} />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              geometry={nodes.calc002_low_calc_0.geometry}
              material={nodes.calc002_low_calc_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              geometry={nodes.calc004_low_calc_0.geometry}
              material={nodes.calc004_low_calc_0.material}
            />
          </group>
        </group>
      </group>
      <Text
        anchorX="right"
        clipRect={[-2.5, -1, 0, 1]}
        material={nodes.calc004_low_calc_0.material}
        maxWidth={2}
        fontSize={0.5}
        position={[1.2, 2.1, 0.41]}
      >
        {display}
      </Text>
    </group>
  );
}

function Button({ nodes, k, onClick }) {
  const [offset, setOffset] = useState(0.0);
  const soundDown = useRef();
  const soundUp = useRef();
  const ref = useRef();
  useEffect(() => {
    soundUp.current.setLoop(false);
    soundDown.current.setLoop(false);
  }, []);

  useEffect(() => {
    if (offset == 0) {
      if (soundUp.current.isPlaying) soundUp.current.stop();
      soundUp.current.play();
    } else {
      if (soundDown.current.isPlaying) soundDown.current.stop();
      soundDown.current.play();
    }
  }, [offset]);

  return (
    <group>
      <PositionalAudio url={"buttondown.m4a"} ref={soundDown} />
      <PositionalAudio url={"buttonup.m4a"} ref={soundUp} />
      <mesh
        ref={ref}
        position={[0.0, offset, 0.0]}
        onClick={(event) => {
          if (offset != 0) onClick(k);
        }}
        onPointerDown={(event) => {
          setOffset(0.03);
          event.stopPropagation();
        }}
        onPointerUp={(event) => {
          setOffset(0);
        }}
        onPointerOut={(event) => {
          setOffset(0);
        }}
        onPointerMissed={(event) => {
          setOffset(0);
        }}
        onPointerLeave={(event) => {
          setOffset(0);
        }}
        onPointerCancel={(event) => {
          if (soundUp.current.isPlaying) soundUp.current.stop();
          soundUp.current.play();
          setOffset(0);
        }}
        geometry={nodes[k].geometry}
        material={nodes[k].material}
      />
    </group>
  );
}

useGLTF.preload("/scene-fixed.glb");
