function rubify() {
  textout = document.getElementById("textout");
  htmlcode = document.getElementById("htmlcode");
  revealbtn = document.getElementById("revealhtml");
  savepng = document.getElementById("savepng");
  savesvg = document.getElementById("savesvg");
  mode = document.forms[0].inputmode.value;
  result = "<ruby>";
  if (mode == "simple") {
    result += fuzzConv();
  } else {
    result += complexConv();
  }
  result += "</ruby>";
  textout.innerHTML = result;
  htmlcode.value = result;
  revealbtn.style.display = "";
  savepng.style.display = "";
  savesvg.style.display = "";
}

function fuzzConv() {
  rb = document.getElementById("rbinput").value;
  rt = document.getElementById("rtinput").value;
  rbArray = rb.split("");
  rtArray = rt.split(" ");
  rblen = rbArray.length;
  rtlen = rtArray.length;
  fuzzout = "";
  if (rblen == "") {
    window.location = "#modal-empty";
  } else if (rblen != rtlen) {
    window.location = "#modal-error";
  } else {
    for (var i = 0; i < rblen; i++) {
      char = rbArray[i];
      tr = rtArray[i];
      fuzzout += "<rb>" + char + "</rb><rp>(</rp><rt>" + tr + "</rt><rp>)</rp>";
    }
  }
  return fuzzout;
}

function complexConv() {
  complexin = document.getElementById("complexin").value;
  groups = complexin.replace(/\)$/, "").split(")");
  complexout = "";
  for (var i = 0; i < groups.length; i++) {
    phr = groups[i].split("(");
    char = phr[0];
    tr = phr[1];
    complexout += "<rb>" + char + "</rb><rp>(</rp><rt>" + tr + "</rt><rp>)</rp>";
  }
  return complexout;
}

function toggleHtml() {
  code = document.getElementById("htmlcode");
  btn = document.getElementById("revealhtml");
  style = code.style;
  if (style.display == "none") {
    style.display = "";
    btn.textContent = "Hide HTML";
  } else {
    style.display = "none";
    btn.textContent = "Show HTML";
  }
}

function changeMode() {
  mode = document.forms[0].inputmode.value;
  div = document.getElementById(mode);
  div.style.display = "";
  off = "simple";
  if (mode == "simple") {
    off = "complex";
  }
  document.getElementById(off).style.display = "none";
}

function changePos() {
  pos = document.forms[1].rbpos.value;
  div = document.getElementById("textout");
  div.style.rubyPosition = pos;
}

function changeSize() {
  size = document.forms[2].rbsize.value;
  rt = document.getElementsByTagName("rt");
  for (i = 0; i < rt.length; i++) {
    rt[i].style.fontSize = size;
  }
}

function changeBg() {
  col = document.forms[3].bgcol.value;
  div = document.getElementById("textout");
  div.style.backgroundColor = col;
}

function setBgColor(picker) {
  document.getElementById('textout').style.backgroundColor = picker;
}

function setTextColor(picker) {
  document.getElementById('textout').style.color = picker;
}

function saveSvg() {
  domtoimage.toSvg(document.querySelector("#textout"))
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'rubify.svg';
      link.href = dataUrl;
      link.click();
    });
}

function savePng() {
  domtoimage.toPng(document.querySelector("#textout"))
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'rubify.png';
      link.href = dataUrl;
      link.click();
    });
}

function demo() {
  lang = parseInt(document.getElementById("demolang").value);

  rbinput = document.getElementById("rbinput");
  rtinput = document.getElementById("rtinput");
  complexin = document.getElementById("complexin");

  rbiArr = ["漢語拼音","注音符號","粵語拼音","日本語の振り仮名","韓國語"];
  rtiArr = ["Hàn yǔ pīn yīn","ㄓㄨˋ ㄧㄣ ㄈㄨˊ ㄏㄠˋ","Jyut⁶ jyu⁵ ping¹ yam¹","に ほん ご の ふ り が な","한 국 어"];
  prcArr = ["漢(Hàn)語(yǔ)拼(pīn)音(yīn)","注(ㄓㄨˋ)音(ㄧㄣ)符(ㄈㄨˊ)號(ㄏㄠˋ)","粵(Jyut⁶)語(jyu⁵)拼(ping¹)音(yam¹)","日(に)本(ほん)語(ご)の()振(ふ)り()仮(が)名(な)","韓(한)國(국)語(어)"];

  rbinput.value = rbiArr[lang];
  rtinput.value = rtiArr[lang];
  complexin.value = prcArr[lang];
}
