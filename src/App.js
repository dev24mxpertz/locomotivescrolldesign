import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll"; // Import Locomotive Scroll
import { Link } from "react-router-dom";
import img1 from "./assests/img1.avif";
import img2 from "./assests/img2.avif";
import img3 from "./assests/img3.avif";
import img4 from "./assests/img4.avif";
import img5 from "./assests/img5.avif";
import img6 from "./assests/img6.avif";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const scrollRef = useRef(null); // Create a reference for the scroll container

  // useEffect(() => {
  //   const ScrollTriggerSettings = {
  //     trigger: ".main",
  //     start: "top 25%",
  //     toggleActions: "play reverse play reverse",
  //   };

  //   const LeftXValues = [-800, -900, -400];
  //   const rightXValues = [800, 900, 400];
  //   const LeftRotationValues = [-30, -20, -35];
  //   const RightRotationValues = [30, 20, 35];
  //   const YValues = [100, -150, -400];

  //   gsap.utils.toArray(".row").forEach((row, index) => {
  //     const cardLeft = row.querySelector(".card-left");
  //     const cardRight = row.querySelector(".card-right");

  //     gsap.to(cardLeft, {
  //       x: LeftXValues[index],
  //       scrollTrigger: {
  //         trigger: ".main",
  //         start: "top center",
  //         end: "150% bottom",
  //         scrub: true,
  //         onUpdate: (self) => {
  //           const progress = self.progress;
  //           cardLeft.style.transform = `translateX(${
  //             progress * LeftXValues[index]
  //           }px rotate(${progress * LeftRotationValues[index]}deg))`;
  //           cardRight.style.transform = `translateX(${
  //             progress * rightXValues[index]
  //           }px rotate(${progress * RightRotationValues[index]}deg))`;
  //         },
  //       },
  //     });

  //     gsap.to(".logo", {
  //       scale: 1,
  //       duration: 0.5,
  //       ease: "power1.out",
  //       scrollTrigger: ScrollTriggerSettings,
  //     });

  //     gsap.to(".line p", {
  //       y: 0,
  //       stagger: 0.1,
  //       duration: 0.5,
  //       ease: "power1.out",
  //       scrollTrigger: ScrollTriggerSettings,
  //     });

  //     gsap.to("button", {
  //       y: 0,
  //       opacity: 1,
  //       delay: 0.25,
  //       duration: 0.5,
  //       ease: "power1.out",
  //       scrollTrigger: ScrollTriggerSettings,
  //     });
  //   });

  //   return() => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  //   }




  // }, []);

  // useEffect(() => {
  //   // Initialize Locomotive Scroll
  //   const scroll = new LocomotiveScroll({
  //     el: scrollRef.current,
  //     smooth: true,
  //   });

  //   // Update Locomotive Scroll on window resize
  //   window.addEventListener("resize", () => {
  //     scroll.update();
  //   });

  //   // Cleanup on unmount
  //   return () => {
  //     scroll.destroy();
  //     window.removeEventListener("resize", () => {
  //       scroll.update();
  //     });
  //   };
  // }, []);


  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    // Make sure ScrollTrigger uses Locomotive's scroll container
    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length
          ? scroll.scrollTo(value, 0, 0)
          : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles its own horizontal scrolling
      pinType: scrollRef.current.style.transform ? "transform" : "fixed",
    });

    // Set up your animations
    const ScrollTriggerSettings = {
      trigger: ".main",
      scroller: scrollRef.current, // Tell ScrollTrigger to use Locomotive's container
      start: "top 25%",
      toggleActions: "play reverse play reverse",
    };

    const LeftXValues = [-800, -900, -400];
    const rightXValues = [800, 900, 400];
    const LeftRotationValues = [-30, -20, -35];
    const RightRotationValues = [30, 20, 35];

    gsap.utils.toArray(".row").forEach((row, index) => {
      const cardLeft = row.querySelector(".card-left");
      const cardRight = row.querySelector(".card-right");

      gsap.to(cardLeft, {
        x: LeftXValues[index],
        scrollTrigger: {
          trigger: ".main",
          scroller: scrollRef.current, // Locomotive scroller
          start: "top center",
          end: "150% bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            cardLeft.style.transform = `translateX(${
              progress * LeftXValues[index]
            }px) rotate(${progress * LeftRotationValues[index]}deg)`;
            cardRight.style.transform = `translateX(${
              progress * rightXValues[index]
            }px) rotate(${progress * RightRotationValues[index]}deg)`;
          },
        },
      });

      // Other animations
      gsap.to(".logo", {
        scale: 1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: ScrollTriggerSettings,
      });

      gsap.to(".line p", {
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: ScrollTriggerSettings,
      });

      gsap.to("button", {
        y: 0,
        opacity: 1,
        delay: 0.25,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: ScrollTriggerSettings,
      });
    });

    // Update both Locomotive and ScrollTrigger on window resize
    window.addEventListener("resize", () => {
      scroll.update();
      ScrollTrigger.refresh();
    });

    // Cleanup Locomotive and ScrollTrigger on component unmount
    return () => {
      scroll.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", () => {
        scroll.update();
        ScrollTrigger.refresh();
      });
    };
  }, []);



  const generateRows = () => {
    const rows = [];
    const images = [img1, img2, img3, img4, img5, img6]; // Array of imported images
    for (let i = 0; i < 3; i++) {
      rows.push(
        <div className="row" key={i}>
          <div className="card card-left">
            <img src={images[2 * i]} alt={`img-${2 * i + 1}`} />
          </div>
          <div className="card card-right">
            <img src={images[2 * i + 1]} alt={`img-${2 * i + 2}`} />
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <div data-scroll-container ref={scrollRef}>
      <section className="hero" data-scroll-section>
        <div className="img">
          <img src={img1} alt="img1" />
        </div>
      </section>
      <section className="main" data-scroll-section>
        <div className="main-content">
          <div className="logo">
            <img src={img2} alt="img2" />
          </div>
          <div className="copy">
            <div className="line">
              <p>Deliver into coding without clutter.</p>
            </div>
            <div className="line">
              <p>Deliver into coding without clutter.</p>
            </div>
            <div className="line">
              <p>Deliver into coding without clutter.</p>
            </div>
          </div>
          <div className="btn">
            <button>Get PRO</button>
          </div>
        </div>
        {generateRows()}
      </section>
      <section className="footer" data-scroll-section>
        <Link
          className="footerLink"
          to="codegrid.gumroad.com/l/codegridpro"
          target="_blank"
        >
          Link in the Description
        </Link>
      </section>
    </div>
  );
};

export default App;
