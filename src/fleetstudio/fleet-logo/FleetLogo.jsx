import React, { useEffect, useRef } from 'react'
import * as Three from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import gsap from 'gsap';

function FleetLogo() {
  useEffect(() => {
    const textColor = 0x41cb6d;
    const endColor = new Three.Color(0xFFFFFF); // White

    const scene = new Three.Scene();
    //scene.background = new Three.Color(0x0b090a);
    scene.background = new Three.Color(0x0b090a);
    const targetColor = new Three.Color(0x419CCB);

    const bgColor = { r: scene.background.r, g: scene.background.g, b: scene.background.b };

    gsap.to(bgColor, {
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      duration: 0.5,
      delay: 9,
      onUpdate: () => {
        scene.background.setRGB(bgColor.r, bgColor.g, bgColor.b);
      },
    });

    const group = new Three.Group();

    const cubeSize = 0.25;
    const biggerCubeSize = 0.35;

    const cubeGeometry = new Three.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterial = new Three.MeshStandardMaterial({ color: textColor });
    const cube = new Three.Mesh(cubeGeometry, cubeMaterial);

    const biggerCubeGeometry = new Three.BoxGeometry(biggerCubeSize, biggerCubeSize, biggerCubeSize);
    const biggerCubeMaterial = new Three.MeshStandardMaterial({ color: textColor });
    const biggerCube = new Three.Mesh(biggerCubeGeometry, biggerCubeMaterial);

    const edgesGeometry = new Three.EdgesGeometry(cubeGeometry);
    const edgesMaterial = new Three.LineBasicMaterial({ color: bgColor, linewidth: 2 })
    const edges = new Three.LineSegments(edgesGeometry, edgesMaterial);

    const biggerEdgesGeometry = new Three.EdgesGeometry(biggerCubeGeometry);
    const biggerEdgesMaterial = new Three.LineBasicMaterial({ color: bgColor, linewidth: 2 });
    const biggerEdges = new Three.LineSegments(biggerEdgesGeometry, biggerEdgesMaterial);

    const sphereGeometry = new Three.SphereGeometry(0.002, 8, 8);
    const sphereMaterial = new Three.MeshBasicMaterial({ color: 0xffffff })
    const sphere = new Three.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0, 0);
    sphere.castShadow = false;
    sphere.receiveShadow = false;
    //scene.add(sphere);

    const sphereGeometry2 = new Three.SphereGeometry(0.002, 8, 8);
    const sphereMaterial2 = new Three.MeshBasicMaterial({ color: 0xffffff })
    const sphere2 = new Three.Mesh(sphereGeometry2, sphereMaterial2);
    sphere2.position.set(0, 0, 0);
    sphere.castShadow = false;
    sphere.receiveShadow = false;
    //scene.add(sphere2);

    const spotLight = new Three.SpotLight(0xffffff, 1);
    const spotLightBiggerCube = new Three.SpotLight(0xffffff, 1);

    //scene.add(group);

    // const planeGeometry = new Three.PlaneGeometry(1000, 1000);
    // const planeMaterial = new Three.ShadowMaterial({ opacity: 0.5 });
    // const plane = new Three.Mesh(planeGeometry, planeMaterial);
    // plane.rotation.x = -Math.PI / 2;
    // plane.position.y = -1;
    // plane.receiveShadow = true;
    // scene.add(plane);

    const loader = new FontLoader();

    let smallCubePosX;
    let smallCubePosY;
    let BigCubePosY;
    let BigCubePosX;

    loader.load('/fonts/Raleway_Medium.json', function (font) {
      const geometry = new TextGeometry('Aathi Eswar', {
        font: font,
        size: 1,
        depth: 1,
      });

      geometry.computeBoundingBox();
      const boundingBox = geometry.boundingBox;
      const xOffset = (boundingBox.max.x - boundingBox.min.x) / 2;
      const yOffset = (boundingBox.max.y - boundingBox.min.y) / 2;

      geometry.translate(-xOffset, -yOffset, 0);

      const materials = [
        new Three.MeshPhongMaterial({ color: textColor }),
        new Three.MeshPhongMaterial({ color: textColor })
      ];

      const textMesh1 = new Three.Mesh(geometry, materials);
      textMesh1.castShadow = false;
      textMesh1.receiveShadow = false;
      group.add(textMesh1);

      const xPosition = (boundingBox.max.x + cubeSize / 2) - 0.3;
      const yPosition = (boundingBox.max.y + cubeSize / 2) - 0.1;

      cube.position.set(xPosition, yPosition, 0);
      edges.position.set(xPosition, yPosition, 0);
      cube.castShadow = false;
      cube.receiveShadow = false;
      sphere.add(cube);
      sphere.add(edges)

      const yPositionBiggerCube = (yPosition - (cubeSize + biggerCubeSize) / 2);
      const xPositionBiggerCueb = xPosition + 0.4;
      biggerEdges.position.set(xPositionBiggerCueb, yPositionBiggerCube, 0);
      biggerCube.position.set(xPositionBiggerCueb, yPositionBiggerCube, 0);
      biggerCube.castShadow = false;
      biggerCube.receiveShadow = false;
      sphere2.add(biggerCube);
      sphere2.add(biggerEdges);

      // spotLight.position.set(xPosition, yPosition + 5, 5);
      // spotLight.target = cube;
      // spotLight.castShadow = true;
      // scene.add(spotLight);

      // spotLightBiggerCube.position.set(xPosition, yPositionBiggerCube + 5, 5);
      // spotLightBiggerCube.target = biggerCube;
      // spotLightBiggerCube.castShadow = true;
      // scene.add(spotLightBiggerCube);

      smallCubePosX = xPosition;
      smallCubePosY = yPosition;
      BigCubePosY = yPositionBiggerCube;
      BigCubePosX = xPositionBiggerCueb;

      sphere.rotation.x = 1.3
      sphere2.rotation.x = 1.3

      const timeline = gsap.timeline({ repeat: -1, ease: "power2.inOut" });
      timeline.from(sphere.rotation, {
        z: 0,
        delay: 3,
      })
        .to(sphere.rotation, {
          z: Math.PI * 2,
          duration: 4,
        })
        .from(sphere2.rotation, {
          z: 0,
          delay: 1,
        })
        .to(sphere2.rotation, {
          z: Math.PI * 2,
          duration: 4,
        })
      gsap.to(textColor, {
        r: endColor.r,
        g: endColor.g,
        b: endColor.b,
        duration: 3,
        delay: 2,
        onUpdate: () => {
          const animatedColor = new Three.Color(textColor.r, textColor.g, textColor.b);
          materials.forEach((material) => {
            material.color.set(animatedColor);
          });
        },
      });

    });

    scene.add(group)

    const { innerWidth, innerHeight } = window;

    const aspect = innerWidth / innerHeight;
    const cameraWidth = 5;
    const cameraHeight = cameraWidth / aspect;

    const camera = new Three.OrthographicCamera(
      -cameraWidth,
      cameraWidth,
      cameraHeight,
      -cameraHeight,
      1,
      20
    );

    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    const canvas = document.querySelector('.canvas');
    const ambientLight = new Three.AmbientLight(textColor, 1);
    ambientLight.castShadow = false;
    ambientLight.receiveShadow = false;
    scene.add(ambientLight);

    const directionalLight = new Three.DirectionalLight(textColor, 5);
    directionalLight.position.set(0, 0, 10);
    directionalLight.castShadow = false;
    directionalLight.receiveShadow= false;
    scene.add(directionalLight);

    // text color animations
    gsap.to(textColor, {
      r: endColor.r,
      g: endColor.g,
      b: endColor.b,
      duration: 3,
      delay: 9,
      onUpdate: () => {
        const animatedColor = new Three.Color(endColor.r, endColor.g, endColor.b);
        ambientLight.color.set(animatedColor);
        directionalLight.color.set(animatedColor);

        cubeMaterial.color.set(animatedColor);
        edgesMaterial.color.set(targetColor);
        biggerCubeMaterial.color.set(animatedColor);
        biggerEdgesMaterial.color.set(targetColor);
      },
    });

    const renderer = new Three.WebGLRenderer({ canvas });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

    window.addEventListener('resize', () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });

    // const renderScene = new RenderPass(scene, camera);
    let clock = new Three.Clock();

    cube.rotation.x = 2.5
    cube.rotation.y = 0.7
    cube.rotation.z = 1.4
    edges.rotation.x = cube.rotation.x
    edges.rotation.y = cube.rotation.y
    edges.rotation.z = cube.rotation.z

    biggerCube.rotation.x = 2.5;
    biggerCube.rotation.y = 0.7;
    biggerCube.rotation.z = 1.4;
    biggerEdges.rotation.x = biggerCube.rotation.x
    biggerEdges.rotation.y = biggerCube.rotation.y
    biggerEdges.rotation.z = biggerCube.rotation.z

    function animate() {
      let time = clock.getElapsedTime();
      cube.position.y = smallCubePosY + 1.5 + Math.sin(time) * 0.7;
      edges.position.y = cube.position.y
      biggerCube.position.y = (BigCubePosY + 1 + Math.cos(time));
      biggerEdges.position.y = biggerCube.position.y
      renderer.render(scene, camera)
      window.requestAnimationFrame(animate);
    }
    animate();
  }, [])

  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const canvas = canvasRef.current;

      const timeline = gsap.timeline({
        defaults: { duration: 1, ease: "power3.inOut" },
      });
      timeline
        .fromTo(
          canvas,
          { opacity: 0 },
          {
            opacity: 1,
            delay: 3,
          }
        )
        .to(canvas, {
           width: "100dvw",
           height: "100dvh",
          top: 0,
          left: 0,
          transform: "none",
          duration: 1.5,
          delay: 2,
        });
      gsap.set(canvas, {
        width: window.innerWidth * (window.innerWidth <= 625 ? 0.5 : 0.2),
        height: window.innerHeight * (window.innerWidth <= 625 ? 0.5 : 0.2),
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      })
    }, canvasRef);

    return () => ctx.revert();
  }, []);

  return (
    <canvas className='canvas logo-canvas' ref={canvasRef}></canvas>
  )
}

export default FleetLogo
