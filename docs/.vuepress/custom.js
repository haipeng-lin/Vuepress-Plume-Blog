// 鼠标点击烟花特效
export function clickEffect() {
    let balls = [];
    let longPressed = false;
    let longPress;
    let multiplier = 0;
    let width, height;
    let origin;
    let normal;
    let ctx;
    const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
    const pointer = document.createElement("span");
    pointer.classList.add("pointer");
    document.body.appendChild(pointer);

    if (canvas.getContext && window.addEventListener) {
        ctx = canvas.getContext("2d");
        updateSize();
        window.addEventListener('resize', updateSize, false);
        loop();
        window.addEventListener("mousedown", function (e) {
            pushBalls(randBetween(10, 20), e.clientX, e.clientY);
            document.body.classList.add("is-pressed");
            longPress = setTimeout(function () {
                document.body.classList.add("is-longpress");
                longPressed = true;
            }, 500);
        }, false);
        window.addEventListener("mouseup", function (e) {
            clearInterval(longPress);
            if (longPressed == true) {
                document.body.classList.remove("is-longpress");
                pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
                longPressed = false;
            }
            document.body.classList.remove("is-pressed");
        }, false);
        window.addEventListener("mousemove", function (e) {
            let x = e.clientX;
            let y = e.clientY;
            pointer.style.top = y + "px";
            pointer.style.left = x + "px";
        }, false);
    } else {
        console.log("canvas or addEventListener is unsupported!");
    }


    function updateSize() {
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(2, 2);
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
        origin = {
            x: width / 2,
            y: height / 2
        };
        normal = {
            x: width / 2,
            y: height / 2
        };
    }
    class Ball {
        constructor(x = origin.x, y = origin.y) {
            this.x = x;
            this.y = y;
            this.angle = Math.PI * 2 * Math.random();
            if (longPressed == true) {
                this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
            } else {
                this.multiplier = randBetween(6, 12);
            }
            this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
            this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
            this.r = randBetween(8, 12) + 3 * Math.random();
            this.color = colours[Math.floor(Math.random() * colours.length)];
        }
        update() {
            this.x += this.vx - normal.x;
            this.y += this.vy - normal.y;
            normal.x = -2 / window.innerWidth * Math.sin(this.angle);
            normal.y = -2 / window.innerHeight * Math.cos(this.angle);
            this.r -= 0.3;
            this.vx *= 0.9;
            this.vy *= 0.9;
        }
    }

    function pushBalls(count = 1, x = origin.x, y = origin.y) {
        for (let i = 0; i < count; i++) {
            balls.push(new Ball(x, y));
        }
    }

    function randBetween(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    function loop() {
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.r < 0) continue;
            ctx.fillStyle = b.color;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
            ctx.fill();
            b.update();
        }
        if (longPressed == true) {
            multiplier += 0.2;
        } else if (!longPressed && multiplier >= 0) {
            multiplier -= 0.4;
        }
        removeBall();
        requestAnimationFrame(loop);
    }

    function removeBall() {
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
                balls.splice(i, 1);
            }
        }
    }
}


export function clickEffect3() {
    


    /**
 * 用于 Canvas 的动画效果库
 * https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/animejs/3.2.1/anime.min.js
 * 教程地址： https://www.5186a.com/?p=1623
 * 看教程不走弯路 转载请保留！！！
 */
    function updateCoords(e) {
        pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left, pointerY = (e.clientY || e.touches[0].clientY) - canvasEl.getBoundingClientRect().top
    }

    function setParticuleDirection(e) {
        var t = anime.random(0, 360) * Math.PI / 180,
            a = anime.random(50, 180),
            n = [-1, 1][anime.random(0, 1)] * a;
        return {
            x: e.x + n * Math.cos(t),
            y: e.y + n * Math.sin(t)
        }
    }

    function createParticule(e, t) {
        var a = {};
        return a.x = e, a.y = t, a.color = colors[anime.random(0, colors.length - 1)], a.radius = anime.random(16, 32), a.endPos = setParticuleDirection(a), a.draw = function () {
            ctx.beginPath(), ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0), ctx.fillStyle = a.color, ctx.fill()
        }, a
    }

    function createCircle(e, t) {
        var a = {};
        return a.x = e, a.y = t, a.color = "#F00", a.radius = .1, a.alpha = .5, a.lineWidth = 6, a.draw = function () {
            ctx.globalAlpha = a.alpha, ctx.beginPath(), ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0), ctx.lineWidth = a.lineWidth, ctx.strokeStyle = a.color, ctx.stroke(), ctx.globalAlpha = 1
        }, a
    }

    function renderParticule(e) {
        for (var t = 0; t < e.animatables.length; t++) e.animatables[t].target.draw()
    }

    function animateParticules(e, t) {
        for (var a = createCircle(e, t), n = [], i = 0; i < numberOfParticules; i++) n.push(createParticule(e, t));
        anime.timeline().add({
            targets: n,
            x: function (e) {
                return e.endPos.x
            },
            y: function (e) {
                return e.endPos.y
            },
            radius: .1,
            duration: anime.random(1200, 1800),
            easing: "easeOutExpo",
            update: renderParticule
        }).add({
            targets: a,
            radius: anime.random(80, 160),
            lineWidth: 0,
            alpha: {
                value: 0,
                easing: "linear",
                duration: anime.random(600, 800)
            },
            duration: anime.random(1200, 1800),
            easing: "easeOutExpo",
            update: renderParticule,
            offset: 0
        })
    }

    function debounce(fn, delay) {
        var timer
        return function () {
            var context = this
            var args = arguments
            clearTimeout(timer)
            timer = setTimeout(function () {
                fn.apply(context, args)
            }, delay)
        }
    }

    var canvasEl = document.querySelector(".fireworks");
    if (canvasEl) {
        var ctx = canvasEl.getContext("2d"),
            numberOfParticules = 30,
            pointerX = 0,
            pointerY = 0,
            tap = "mousedown",
            colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"],
            setCanvasSize = debounce(function () {
                canvasEl.width = 2 * window.innerWidth, canvasEl.height = 2 * window.innerHeight, canvasEl.style.width = window.innerWidth + "px", canvasEl.style.height = window.innerHeight + "px", canvasEl.getContext("2d").scale(2, 2)
            }, 500),
            render = anime({
                duration: 1 / 0,
                update: function () {
                    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
                }
            });
        document.addEventListener(tap, function (e) {
            "sidebar" !== e.target.id && "toggle-sidebar" !== e.target.id && "A" !== e.target.nodeName && "IMG" !== e.target.nodeName && (render.play(), updateCoords(e), animateParticules(pointerX, pointerY))
        }, !1), setCanvasSize(), window.addEventListener("resize", setCanvasSize, !1)
    }
}