function updateProgress() {
  linkedinNum = linkedinScore(document.getElementById("linkedIn").value)
  githubNum = githubScore(document.getElementById("gitHub").value)
  websiteNum = websiteScore(document.getElementById("website").value)
  projectNum = projectScore(document.getElementById("projects").value)
  workexpNum = workexpScore(document.getElementById("experience").value)
  skillNum = skillScore(document.getElementById("skills").value)
  coursesNum = coursesScore(document.getElementById("courses").value)
  hobbiesNum = hobbiesScore(document.getElementById("hobbies").value)
  totalNum = computeScore(linkedinNum, githubNum, websiteNum, projectNum, workexpNum, skillNum, coursesNum, hobbiesNum)
  move(linkedinNum, "linkedInBar");
  move(githubNum, "gitHubBar");
  move(websiteNum, "websiteBar");
  move(projectNum, "projectsBar");
  move(workexpNum, "experienceBar");
  move(skillNum, "skillsBar");
  move(coursesNum, "coursesBar");
  move(hobbiesNum, "hobbiesBar");
  move(totalNum, "totalBar");
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

function linkedinScore(input){
  if(String (input)==null || String (input).search("linkedin.com/in/")==-1) return 0
  return 100
}

function githubScore(input){
  if(String(input)==null || String(input).search("github.com/")==-1) return 0
  return 100
}

function websiteScore(input){
  if(input=="") return 0
  return 100
}

function projectScore(input){
  if (input == "") count = 0;
  else count = input.split(/\r\n|\r|\n/).length;

  if (count==0) return 0
  else if(count==1) return 25
  else if(count==2) return 50
  else if(count>=3) return 100
}

function workexpScore(input){
  if (input == "") count = 0;
  else count = input.split(/\r\n|\r|\n/).length;

  if (count==0) return 0
  else if(count==1) return 25
  else if(count==2) return 50
  else if(count>=3) return 100
}

function skillScore(input){
  var skillsScoreIdealMap=new Map([["programmingLanguage",4],["database",1],["operatingSystem",2],["servingAPI",2],["hosting",1],["serverManagement",2]]);
  var skillsScoreMap=new Map([["programmingLanguage",0],["database",0],["operatingSystem",0],["servingAPI",0],["hosting",0],["serverManagement",0]]);
  var programmingLanguage=["C","C++","Java","JavaScript","Python","Go","TypeScript","Ruby","C#","Swift"];//4
  var database=["MySQL","SQLite","MongoDb"];//1
  var operatingSystem=["Windows","Linux","Mac"];//2
  var servingAPI=["JSON","GraphQL","XML"];//2
  var hosting=["AWS","Google Cloud","Microsoft Azure","Cloudfare"];//1
  var serverManagement=["Docker","Kubernetes","Nginx","Node","Maeven","Github","Gradle"];//2
  var arrayOfLines = input.split("\n"); // arrayOfLines is array where every element is string of one line
  arrayOfLines.forEach(function(item){

    if(programmingLanguage.includes(item)){
      skillsScoreMap.set("programmingLanguage",skillsScoreMap.get("programmingLanguage")+1);
    }
    else if(database.includes(item)){
      skillsScoreMap.set("database",skillsScoreMap.get("database")+1);
    }
    else if(servingAPI.includes(item)){
      skillsScoreMap.set("servingAPI",skillsScoreMap.get("servingAPI")+1);
    }
    else if(operatingSystem.includes(item)){
      skillsScoreMap.set("operatingSystem",skillsScoreMap.get("operatingSystem")+1);
    }
    else if(hosting.includes(item)){
      skillsScoreMap.set("hosting",skillsScoreMap.get("hosting")+1);
    }
    else if(serverManagement.includes(item)){
      skillsScoreMap.set("serverManagement",skillsScoreMap.get("serverManagement")+1);
    }
  });
  //Compute Skills Score
  var skillScore=0;
  skillsScoreMap.forEach(function(value,item){
    skillsScoreMap.set(item,Math.min(100,((skillsScoreMap.get(item) * 100)/skillsScoreIdealMap.get(item)).toFixed(2)));
    skillScore+=skillsScoreMap.get(item);
  });
  return  Number((skillScore/skillsScoreMap.size).toFixed(2));
}

function coursesScore(input){
  if (input == "") count = 0;
  else count = input.split(/\r\n|\r|\n/).length;
  var coursesIdealNumber=4; //Ideal expectations
  return Math.min(100,((count*100)/coursesIdealNumber).toFixed(2));
}

function hobbiesScore(input){
  if (input == "") count = 0;
  else count = input.split(/\r\n|\r|\n/).length;
  var interestsIdealNumber=3; //Ideal expectations
  return Math.min(100,((count * 100)/interestsIdealNumber).toFixed(2));
}

function computeScore(linkedinData,githubData,projectsData,skillsData,coursesData,interestData,experiencesData){
  return (linkedinData + githubData + projectsData + skillsData + coursesData + interestData + experiencesData)/8
}
