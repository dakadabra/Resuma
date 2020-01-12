function computeScore(linkedinData,githubData,projectsData,skillsData,coursesData,interestData,experiencesData){
	//convert data to array
	projectsData=convertDataToArray(projectsData);
	skillsData=convertDataToArray(skillsData);
	coursesData=convertDataToArray(coursesData);
	interestData=convertDataToArray(coursesData);
	experiencesData=convertDataToArray(experiencesData);
	var scoreMap=new Map([["Linkedin",0],["Github",0],["Projects",0],["Skills",0],["Courses",0],["Interests",0],["Experiences",0]]);
	//Lindedin
	scoreMap.set("Linkedin",linkedinScore(linkedinData));
	//Github
	scoreMap.set("Github",githubScore(githubData));
	//Projects
	scoreMap.set("Projects",projectScore(projectsData));
	//Courses
	scoreMap.set("Courses",coursesScore(coursesData));
	//interests
	scoreMap.set("Interests",interestScore(interestData));
	//experiences
	scoreMap.set("Experiences",experiencesScore(experiencesData));
	//skills
	scoreMap.set("Skills",skillsScore(skillsData));
	//Compute Final Score
	var finalScore=0;
	scoreMap.forEach(function(value,item){
		finalScore+=value;
	});
	
	return [Number((finalScore/scoreMap.size).toFixed(2)),scoreMap];
}
function linkedinScore(input){

    if(String (input)==null || String (input).search("linkedin.com/in/")==-1){
		return 0;
	}
    return 1;           
}

function githubScore(input){

    if(String(input)==null || String(input).search("github.com/")==-1){
        return 0;        
    }
    return 1;
}
function skillsScore(input){
	var skillsScoreIdealMap=new Map([["programmingLanguage",4],["database",2],["operatingSystem",2],["servingAPI",2],["hosting",1],["serverManagement",4]]);
	var skillsScoreMap=new Map([["programmingLanguage",0],["database",0],["operatingSystem",0],["servingAPI",0],["hosting",0],["serverManagement",0]]);
	var programmingLanguage=["C","C++","Java","JavaScript","Python","Go","TypeScript","Ruby","C#","Swift"];//4
	var database=["MySQL","SQLite","MongoDb","MySQL"];//2
	var operatingSystem=["Windows","Linux","Mac"];//2
	var servingAPI=["JSON","GraphQL","XML"];//2
	var hosting=["AWS","Google Cloud","Microsoft Azure","Cloudfare"];//1
	var serverManagement=["Docker","Kubernetes","Nginx","Node","Maeven","Github","Gradle"];//4
	//var studentSkills=["Github","JavaScript","AWS","Python","Linux","Go","Docker","Gradle","Kubernetes",];//TODOOOO EXTRACT FROM WEBSITE
	input.forEach(function(item){
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
		else{
			skillsScoreMap.set("serverManagement",skillsScoreMap.get("serverManagement")+1);
		}	
	});
	//Compute Skills Score
	var skillScore=0;
	skillsScoreMap.forEach(function(value,item){
		skillsScoreMap.set(item,Math.min(1,(skillsScoreMap.get(item)/skillsScoreIdealMap.get(item)).toFixed(2)));
		skillScore+=skillsScoreMap.get(item);
	});
	return  Number((skillScore/skillsScoreMap.size).toFixed(2));
}
function coursesScore(input){
	//Ideal expectations
	var coursesIdealNumber=15;
    return Math.min(1,(input.length/coursesIdealNumber).toFixed(2));
}
function projectScore(input){
	//Ideal expectations
	var projectsIdealNumber=3;
   return Math.min(1,(input.length/projectsIdealNumber).toFixed(2));
}
function interestScore(input){
	//Ideal expectations
	var interestsIdealNumber=4;
   return Math.min(1,(input.length/interestsIdealNumber).toFixed(2));
}
function experiencesScore(input){
	//Ideal expectations
	var experiencesIdealNumber=2;
   return Math.min(1,(input.length/experiencesIdealNumber).toFixed(2));
}
function convertDataToArray(input){
	if(input === null || input.match(/^ *$/) !== null){
		return [];
	}
	return input.split("\n");
}
//console.log(computeScore("https://www.linkedin.com/in/fatou-toure-mayer-61b2b417/?originalSubdomain=ca","https://github.com/dakadabra/Resumabuilder",["Hello","sALUT"],["Github","JavaScript","AWS","Python","Linux","Go","Docker","Gradle","Kubernetes",],["COURS1","COURS2","COURS3","COURS4"],["Music","Dancing","Sing"],["exp1","exp2","exp3"]));
