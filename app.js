AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
   

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
// tyoed js for home section skill
var typed=new Typed(".text-brand",{
  strings:["WEB DEVELOPER","Frontend Developer","Programmer","Software Developer"],
  typedSpeed:80,
  backSpeed:85,
  loop:true
})