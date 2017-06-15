
describe('package installer exercise specs', () => {
    var PackageInstaller = require('../src/packageInstaller');
    var testInstaller;
    beforeEach(() => {
        testInstaller = new PackageInstaller();

        spyOn(testInstaller, "setSavedInputString").and.callThrough();
    });


    afterEach(() => {
        testInstaller = null;
    });


    describe('Verify that the object is set up correctly', () => {
        it('should be an object', () => {
            expect(testInstaller).toEqual(jasmine.any(Object));
        });
    });


    describe('getters and setters', () => {
        var result;
        beforeEach(() => {
            result = null;
        });

        afterEach(() => {
            result = null;
        });

        it('should get savedInputString', () => {
            result = testInstaller.getSavedInputString();
            expect(result).toEqual(testInstaller.m_savedInputString);
        });

        it('should set savedInputString', () => {
            testInstaller.setSavedInputString("foo");
            expect(testInstaller.m_savedInputString).toEqual("foo");
        });
    });

    describe('validate the input', () => {
        it('should only accept arrays', () => {
            expect(testInstaller.validateInput([])).toEqual(true);
            expect(function () { testInstaller.validateInput([1, 2, 3]); }).not.toThrow("datatype error");
            expect(function () { testInstaller.validateInput("stuff"); }).toThrow("datatype error");
        });
    });


    describe('generate output', () => {
        var dependencies;
        var sortedResults;
        var result;
        describe('generate the list of nodes', () => {
            it('should create as many objects as there are dependencies', () => {
                dependencies = ["KittenService: CamelCaser", "CamelCaser: "]

                result = testInstaller.generateNodes(dependencies);
                expect(result.length).toEqual(dependencies.length);
            });
            it('should have an empty incomingEdges array if the dependency does not depend on anything else', () => {
                dependencies = ["CamelCaser: "];
                result = testInstaller.generateNodes(dependencies);
                expect(result[0].incomingEdges).toEqual([]);
            });
        });

        describe('kahnsSort', () => {
            it('should return a valid dependency order', () => {
                dependencies = ["KittenService: CamelCaser", "CamelCaser: "];
                result = testInstaller.kahnsSort(dependencies);
                expect(result).toEqual(['CamelCaser', 'KittenService']);
            });
            it('should throw an error for dependency loops', () => {
                dependencies = ["KittenService: ",
                    "Leetmeme: Cyberportal",
                    "Cyberportal: Ice",
                    "CamelCaser: KittenService",
                    "Fraudstream: ",
                    "Ice: Leetmeme"
                ]
                expect(function () { testInstaller.kahnsSort(dependencies); }).toThrow("cycle error");

            });
        });

        describe('generate output', () => {
            it('should format output correctly', () => {
                sortedResults = ['CamelCaser', 'KittenService'];
                result = testInstaller.generateOutput(sortedResults);
                expect(result).toEqual("CamelCaser, KittenService");
            });
        });
    });


    describe('should take in input and return final output', () => {
        var dependencies;
        var result;

        it('should generate a valid response for valid data', () => {
            dependencies = ["KittenService: CamelCaser", "CamelCaser: "]
            result = testInstaller.main(dependencies);
            expect(result).toEqual("CamelCaser, KittenService");

            dependencies = [
                "KittenService: ",
                "Leetmeme: Cyberportal",
                "Cyberportal: Ice",
                "CamelCaser: KittenService",
                "Fraudstream: Leetmeme",
                "Ice: "
            ]
            result = testInstaller.main(dependencies);
            expect(result).toEqual("Ice, Cyberportal, Leetmeme, Fraudstream, KittenService, CamelCaser");
        });


        it('should generate a valid response for valid data with more than 1 dependency chain', () => {

            var valid1 = ["A: C", "B: C", "C: "];
            var valid2 = ["E: A", "F: B", "B: C", "C: D", "G: D", "A: G", "D: "];

            result = testInstaller.main(valid1);
            expect(result).toEqual("C, B, A");
            result = testInstaller.main(valid2);
            expect(result).toEqual("D, G, A, E, C, B, F");
        });


        it('should catch any thrown errors', () => {
            dependencies = [
                "KittenService: ",
                "Leetmeme: Cyberportal",
                "Cyberportal: Ice",
                "CamelCaser: KittenService",
                "Fraudstream: ",
                "Ice: Leetmeme"
            ]

            expect(testInstaller.main(dependencies)).toEqual("An error occured, please verify that the dependency list is valid and try again.");

        });
        it('should throw an error for garbage input', () => {
            expect(function () { testInstaller.validateInput(null); }).toThrow("datatype error");
            expect(function () { testInstaller.validateInput(undefined); }).toThrow("datatype error");
            expect(function () { testInstaller.validateInput("foo"); }).toThrow("datatype error");
            expect(function () { testInstaller.validateInput(42); }).toThrow("datatype error");
            expect(function () { testInstaller.validateInput({}); }).toThrow("datatype error");
        });
    });
});
