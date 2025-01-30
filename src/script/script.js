function GetUrlParameter(){
    return window.location.search.substring(1).replaceAll("%20"," ").toUpperCase();
}
if(GetUrlParameter()){
  $("#guest").html(GetUrlParameter());
}

let currentPage = 1;

function toggleClass(e, toggleClassName) {
  if (e.className.includes(toggleClassName)) {
    e.className = e.className.replace(' ' + toggleClassName, '');
  } else {
    e.className += ' ' + toggleClassName;
  }
}

function movePage(e, page) {
  sliding = 3;
  e = document.getElementById("page-" + e);
  if (page == currentPage) {
    currentPage += 2;
    toggleClass(e, "left-side");
    toggleClass(e.nextElementSibling, "left-side");

  }
  else if (page = currentPage - 1) {
    currentPage -= 2;
    toggleClass(e, "left-side");
    toggleClass(e.previousElementSibling, "left-side");
  }
  sliding = 0;
}
function closedbook() {
  currentPage = 1;
  e = document.getElementById("page-8");
  for (var i = 1; i <= 8; i++) {
    document.getElementById("page-" + i).classList.remove("left-side");
  }
}

var myAudio = document.getElementById("myAudio");
var isPlaying = false;

function togglePlay() {
  isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function () {
  document.documentElement.requestFullscreen();
  isPlaying = true;
  $(".btn-audio").removeClass("fa-circle-play");
  $(".btn-audio").addClass("fa-circle-pause");
};
myAudio.onpause = function () {
  document.exitFullscreen();
  isPlaying = false;
  $(".btn-audio").removeClass("fa-circle-pause");
  $(".btn-audio").addClass("fa-circle-play");
};

var hide = 1;

function hidenav() {
  if (hide == 0) {
    $(".nav-absolute").addClass('hide');
    $(".btn-hide").addClass('rotate');
    hide = 1;
  } else {
    $(".nav-absolute").removeClass('hide');
    $(".btn-hide").removeClass('rotate');
    hide = 0;
  }
}
function none() {
  sliding = 0;
}
function alertCopy(text) {
  var an = "Nomor Rekening an. Depa Melina";
  var norek = "(3211123361)";
  if (text != "3211123361") {
    var an = "Nomor Rekening an. Muhamad Rijki Juhara";
    var norek = "(010401050839506)";
  }
  $(".an").html(an);
  $(".norek").html(norek);
  $('#modal').modal('show');
  slideStart();
  slideEnd();
}
function copy(text) {
  navigator.clipboard.writeText(text);
  alertCopy(text);
}
var sliding = startClientY = startPixelOffset = pixelOffset = currentSlide = targetSlide = 0;
slideCount = $('.carousel-item').length;

$('.carousel').carousel({
  interval: false,
});
$('#user-role-caro .carousel-inner .carousel-item').on('mousedown touchstart', slideStart);
$('#user-role-caro .carousel-inner .carousel-item').on('mouseup touchend', slideEnd);
$('#user-role-caro .carousel-inner .carousel-item').on('mousemove touchmove', slide);
$("#s0").click(function () {
  currentSlide = 0;
});
$("#s1").click(function () {
  currentSlide = 1;
});
$("#s2").click(function () {
  currentSlide = 2;
});
$("#s3").click(function () {
  currentSlide = 3;
});
$("#s4").click(function () {
  currentSlide = 4;
});
$("#s5").click(function () {
  currentSlide = 5;
});

function slideStart(event) {
  console.log("slideStart");
  if (event.originalEvent.touches)
    event = event.originalEvent.touches[0];
  if (sliding == 0) {
    sliding = 1; 
    startClientY = event.clientY;
  }
}

function slide(event) {
  event.preventDefault();
  if (event.originalEvent.touches)
    event = event.originalEvent.touches[0];
  var deltaSlide = event.clientY - startClientY;
  console.log("slide " + deltaSlide);
  if (sliding == 1 && (deltaSlide < -50 || deltaSlide > 50)) {
    sliding = 2; 
    startPixelOffset = pixelOffset; 
  }

  if (sliding == 2) {
    var touchPixelRatio = 1;
    if ((currentSlide == 0 && event.clientY > startClientY) ||
      (currentSlide == slideCount - 1 && event.clientX < startClientY))
      touchPixelRatio = 3;
    pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
  }
}

function slideEnd(event) {
  console.log("slideEnd");
  if (sliding == 2) {
    sliding = 0;
    currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide - 1;
    currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
    pixelOffset = currentSlide * -$('.carousel-inner').width();
    targetSlide = currentSlide + 1;
    $('.carousel-indicators li:nth-child(' + targetSlide + ')').click();
    closedbook();
  }
}