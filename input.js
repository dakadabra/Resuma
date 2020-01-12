function updateProgress() {
  move(linkedin(document.getElementById("linkedIn").value), "linkedInBar");
  move(github(document.getElementById("gitHub").value), "gitHubBar");
  move(website(document.getElementById("website").value), "websiteBar");
  move(workexp(document.getElementById("experience").value), "experienceBar");
  move(skill(document.getElementById("skills").value), "skillsBar");
}

function move(amountMoved, barName) {
  var elem = document.getElementById(barName);
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= amountMoved) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + "%";
    }
  }
}

function linkedin(input){
  if(String (input)==null || String (input).search("linkedin.com/in/")==-1) return 0
  return 100
}

function github(input){
  if(String(input)==null || String(input).search("github.com/")==-1) return 0
  return 100
}

function website(input){
  if(input=="") return 0
  return 100
}

function workexp(input){
  if (input == "") count = 0;
  else count = input.split(/\r\n|\r|\n/).length;

  if (count==0) return 0
  else if(count==1) return 25
  else if(count==2) return 50
  else if(count>=3) return 100
}

function skill(input){
  if (input == "") count = 0;
  else count = input.split(/\r\n|\r|\n/).length;
  if(count==0) return 0
  else if(0<count<=3) return 25
  else if(3<count<=6) return 50
  else if(count>6) return 100
}
