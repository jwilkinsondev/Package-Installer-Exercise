var inputString = "some string";



function PackageInstaller() {
    this.m_savedInputString;
};

/* getters and setters*/

PackageInstaller.prototype.getSavedInputString = function(){
    return this.m_savedInputString;
}
PackageInstaller.prototype.setSavedInputString = function(input){
    this.m_savedInputString = input;
}
//------------------------------------------------------------------------------------------------------


PackageInstaller.prototype.getRawInput = function(){
    this.setSavedInputString(inputString);
}

PackageInstaller.prototype.validateInput = function(){
    var dependencies = this.getSavedInputString();
    if(!Array.isArray(dependencies)){
        // the input isn't even an array so it's not valid
        return false;
    }
    if(this.checkForDependencyLoops(dependencies)){
        // there are loops in the dependency so it's not valid
        return false;
    }

    return true;
}

PackageInstaller.prototype.kahnsSort = function(dependencies){

}

PackageInstaller.prototype.generateNodes = function(input){
    var result = [];
    var workingNode = {
        name: "",
        incomingEdges:[]
    };
    input.forEach(function(element) {
        workingNode.name = element.substring(0, element.indexOf(":"));
        
        // only push an edge if one exists, otherwise, leave the edge array empty
        if(element.substring(element.indexOf(":") + 2).length){
            workingNode.incomingEdges.push(element.substring(element.indexOf(":") + 2));
        };
        result.push(workingNode);
        workingNode = {
            name: "",
            incomingEdges:[]
        }
    }, this);
    console.log(result);
    return result;
}






module.exports = PackageInstaller;