//基础swiper设置
var swiper = new Swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  direction: 'vertical',
  slidesPerView: 1,
  paginationClickable: true,
  mousewheelControl: true,
  parallax: true,
  onTransitionEnd: function (swiper) {
    console.log(swiper.activeIndex);
    if (swiper.activeIndex == 1) { //第二张的animated动画
      setTimeout(function () {
        $(".slider-1 .box").addClass("fadeIn");
      }, 500);
    }
    if (swiper.activeIndex == 3) { //第四张的animated动画
      setTimeout(function () {
        myChart.setOption(option);
        $(".ball-parent").addClass("fadeIn");
      }, 500);
    }
    if (swiper.activeIndex == 3) { //第四张的animated动画
      setTimeout(function () {
        myChart.setOption(option);
        $(".ball-parent").addClass("fadeIn");
      }, 500);
    }

  }
});

//Hello world效果
$(function () {
  setTimeout(function () {
    $('.textarea').typetype("Hello world!");
  }, 500);
});

//导航页面跳转
$("#my-nav").on('click', 'ul a', function (e) {
  e.preventDefault();
  $target = $(e.target);
  swiper.slideTo($target.attr('href'), 1000, false);
});
$("#my-btn").click(function (e) {
  e.preventDefault();
  $target = $(e.target);
  swiper.slideTo(1, 1000, false);
  setTimeout(function () {
    $(".slider-1 .box").addClass("fadeIn");
  }, 500);
});
//雷达图
var myChart = echarts.init(document.getElementById('myRadar'));
var data = [{
  value: [100, 98, 96, 95, 90, 92],
  name: '能力展示'
}];

var lineStyle = {
  normal: {
    width: 1,
    opacity: 0.5
  }
};

option = {
  //backgroundColor: '#161627',
  title: {
    text: 'SKILLS',
    left: 'center',
    textStyle: {
      color: '#eee'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {},
  radar: {
    indicator: [
      {text: 'HTML', max: 100},
      {text: 'JavaScript', max: 100},
      {text: 'CSS3', max: 100},
      {text: 'jQuery', max: 100},
      {text: 'AJAX', max: 100},
      {text: 'AngularJS', max: 100}
    ],
    shape: 'circle',
    splitNumber: 5,
    name: {
      textStyle: {
        color: 'rgb(238, 197, 102)'
      }
    },
    splitLine: {
      lineStyle: {
        color: [
          'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
          'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
          'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
        ].reverse()
      }
    },
    splitArea: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(238, 197, 102, 0.8)'
      }
    }
  },
  series: [
    {
      name: '个人能力',
      type: 'radar',
      lineStyle: lineStyle,
      data: data,
      itemStyle: {
        normal: {
          color: '#F9713C'
        }
      },
      areaStyle: {
        normal: {
          opacity: 0.3
        }
      }
    }
  ]
};
//云标签
(function () {
  var tagsE = $("#ball a"),
     tags = [],
     box = document.getElementById("ball"),
     radius = 180,
     angleX = Math.PI / 180,
     angleY = Math.PI / 180,
     fullLength = 300,
     offsetLeft = box.offsetLeft,
     offsetTop = box.offsetTop,
     CX = box.offsetWidth / 2,
     CY = box.offsetHeight / 2,
     animated = false,
     cvs = document.querySelector("#ball canvas"),
     ctx = cvs.getContext("2d");

  cvs.width = "600";
  cvs.height = "600";
  cvs.style.zIndex = tagsE.length / 2;

  function tag(e, x, y, z) {
    this.e = e;
    this.x = x;
    this.y = y;
    this.z = z;
  }


  function initial() {
    for (var i = 0; i < tagsE.length; i++) {
      var a = Math.acos((2 * (i + 1) - 1) / tagsE.length - 1);
      var b = a * Math.sqrt(tagsE.length * Math.PI);
      var x = radius * Math.sin(a) * Math.cos(b);
      var y = radius * Math.sin(a) * Math.sin(b);
      var z = radius * Math.cos(a);
      tags.push(new tag(tagsE[i], x, y, z));

    }
    tags.forEach(function (e, index, group) {

      e.move();
    });
  }

  tag.prototype.move = function () {
    var scale = (fullLength + this.z) / fullLength / 1.1;
    var opacity = (this.z + radius * 2) / (radius * 2);
    this.e.style.fontSize = scale * 18 + "px";
    this.e.style.opacity = opacity;
    this.e.style.left = this.x + CX - this.e.offsetWidth / 2 + "px";
    this.e.style.top = this.y + CY - this.e.offsetHeight / 2 + "px";
    this.e.style.zIndex = parseInt(scale * 10);

  }
  box.onmousemove = function (e) {
    animated = true;
    angleY = -(e.clientY - offsetTop - CY) * 0.00001;
    angleX = (e.clientX - offsetLeft - CX) * 0.00001;
  };

  box.onmouseout = function () {
    animated = false;
  }

  function rotate() {
    ca = Math.cos(angleY);
    sa = Math.sin(angleY);
    cb = Math.cos(angleX);
    sb = Math.sin(angleX);

    tags.forEach(function (element, index, group) {
      var rx1 = element.x;
      var ry1 = element.y * ca + element.z * (-sa);
      var rz1 = element.y * sa + element.z * ca;

      var rx2 = rx1 * cb + rz1 * sb;
      var ry2 = ry1;
      var rz2 = rx1 * (-sb) + rz1 * cb;


      element.x = rx2;
      element.y = ry2;
      element.z = rz2;

    });
  }

  function animate() {


    rotate();
    tags.forEach(function (e, index, group) {
      e.move();
    });
    if (!animated) {
      angleX *= 0.98;
      angleY *= 0.98;
    }
    drawCanvas();
    requestAnimationFrame(animate);
  }

  function drawCanvas() {
    ctx.clearRect(0, 0, CX * 2, CY * 2);
    ctx.strokeStyle = "rgba(141,141,141,.6)";

    tags.forEach(function (element, index, group) {
      ctx.beginPath();
      ctx.moveTo(CX, CY);
      ctx.lineWidth = (element.z + radius * 2) / (radius * 2);
      ctx.lineTo(element.x + CX + parseInt(element.e.offsetWidth) / 2, element.y + CY + parseInt(element.e.offsetHeight) / 2);
      ctx.stroke();

    });
  }

  initial();
  animate();

})();
//myChart.setOption(option);

$('.parent1,.parent2,.parent3,.parent4').hover(function () {
  $(this).children('.front').css('transform', "rotateY(180deg)");
  $(this).children('.back').css('transform', "rotateY(0deg)");
}, function () {
  $(this).children('.front').css('transform', "rotateY(0deg)");
  $(this).children('.back').css('transform', "rotateY(180deg)");
});
