
function PackageInstaller() {
    this.m_savedInputString;
};

/* getters and setters*/

PackageInstaller.prototype.getSavedInputString = function () {
    return this.m_savedInputString;
}
PackageInstaller.prototype.setSavedInputString = function (input) {
    this.m_savedInputString = input;
}
//------------------------------------------------------------------------------------------------------



PackageInstaller.prototype.validateInput = function (input) {

    if (!Array.isArray(input)) {
        // the input isn't even an array so it's not valid
        return false;
    }
    return true;
}

PackageInstaller.prototype.kahnsSort = function (input) {
    var result = [];
    var nextNodes = [];
    var currentNode;
    var nodes = this.generateNodes(input);
    var validationLength = nodes.length;

    nodes = nodes.filter(function(node){
        // if a node isn't dependent on anything, add it to the list of next avalible nodes
        if (node.incomingEdges == 0) {
            nextNodes.push(node);
            return false;
        }
        // by default, keep the node
        return true
    })

    // while nextNodes isn't empty
    while (nextNodes.length > 0) {
        currentNode = nextNodes.pop();
        result.push(currentNode.name);

        nodes = nodes.filter(function(node){
            //filter out incomingEdges that match the name of the node we just installed
            node.incomingEdges = node.incomingEdges.filter(function (edge) {
                return edge !== currentNode.name;
            })

            // check to see if all of its dependencies are now resolved
            if (node.incomingEdges.length === 0) {
                nextNodes.push(node)
                // remove the node from the list
                return false ;
            }

            // by default, keep the node
            return true;
        })

    }
    if (result.length === validationLength) {
        return result;
    }
    else {
        return -1;
    }

}

PackageInstaller.prototype.generateNodes = function (input) {
    var result = [];
    var workingNode = {
        name: "",
        incomingEdges: []
    };
    input.forEach(function (element) {
        workingNode.name = element.substring(0, element.indexOf(":"));

        // only push an edge if one exists, otherwise, leave the edge array empty
        if (element.substring(element.indexOf(":") + 2).length) {
            workingNode.incomingEdges.push(element.substring(element.indexOf(":") + 2));
        };
        result.push(workingNode);
        workingNode = {
            name: "",
            incomingEdges: []
        }
    }, this);
    return result;
}

PackageInstaller.prototype.generateOutput = function (input) {
    if (input === -1) {
        return "The dependency list contained a cycle. Please resolve the cycle and resubmit.";
    }

    return input.join(', ');
}

PackageInstaller.prototype.main = function (input) {
    var sortedNodes;
    var result;
    // make sure that the input is actually an array
    if (this.validateInput(input)) {
        sortedNodes = this.kahnsSort(input);
        result = this.generateOutput(sortedNodes);
        return result;
    }
    else {
        return "An invalid list of dependencies was submitted. Please fix the dependencies and resubmit."
    }

}


var testInstaller = new PackageInstaller();
var valid1 = ["KittenService: CamelCaser", "CamelCaser: "];
var valid2 = [
    "KittenService: ",
    "Leetmeme: Cyberportal",
    "Cyberportal: Ice",
    "CamelCaser: KittenService",
    "Fraudstream: Leetmeme",
    "Ice: "
]
var valid3 = ["A: C", "B: C", "C: "];
var valid4 = ["E: A", "F: B", "B: C", "C: D", "G: D", "A: G", "D: "]
var invalid1 = [
    "KittenService: ",
    "Leetmeme: Cyberportal",
    "Cyberportal: Ice",
    "CamelCaser: KittenService",
    "Fraudstream: ",
    "Ice: Leetmeme"
]


//console.log(testInstaller.main(valid1));
//console.log(testInstaller.main(valid2));
//console.log(testInstaller.main(valid3));
console.log(testInstaller.main(valid4));
//console.log(testInstaller.main(invalid1));
//console.log(testInstaller.main(null));
module.exports = PackageInstaller;