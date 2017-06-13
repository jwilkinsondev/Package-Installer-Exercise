
describe('package installer exercise specs', () => {
  var PackageInstaller = require('../src/packageInstaller');
  var testInstaller
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
      
  
  describe('Handle input', () => {
      
      it('should take in input', () => {
          testInstaller.getRawInput();
          expect(testInstaller.m_savedInputString.length).toBeGreaterThan(0);
      });
      
      it('should store the input', () => {
          testInstaller.getRawInput();
          expect(testInstaller.getSavedInputString().length).toBeGreaterThan(0);
          expect(testInstaller.setSavedInputString).toHaveBeenCalled();
      });
          
  });

  
  describe('validate the input', () => {
      it('should only accept arrays', () => {
          testInstaller.m_savedInputString = [];
          expect(testInstaller.validateInput()).toEqual(true);
          testInstaller.m_savedInputString = "stuff";
          expect(testInstaller.validateInput()).toEqual(false);
      });
  });

  
  describe('generate output', () => {
      var dependencies;
      var sortedResults;
      var result;
      describe('generate the list of nodes', () => {
          
          it('should create as many objects as there are dependencies', () => {
              dependencies = [ "KittenService: CamelCaser", "CamelCaser: " ]

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
              dependencies = [ "KittenService: CamelCaser", "CamelCaser: " ];
              result = testInstaller.kahnsSort(dependencies);
              expect(result).toEqual([ 'CamelCaser', 'KittenService' ]);
          });

          
          it('should return -1 for dependency loops', () => {
                dependencies =  ["KittenService: ",
                    "Leetmeme: Cyberportal",
                    "Cyberportal: Ice",
                    "CamelCaser: KittenService",
                    "Fraudstream: ",
                    "Ice: Leetmeme"
                ]
                result = testInstaller.kahnsSort(dependencies);
                expect(result).toEqual(-1)
          });
      });
          
      
      describe('generate output', () => {
          
          it('should handle success correctly', () => {
              sortedResults = [ 'CamelCaser', 'KittenService' ];
              result = testInstaller.generateOutput(sortedResults);
              expect(result).toEqual("CamelCaser, KittenService");
          });
          
          it('should handle loops correctly', () => {
              sortedResults = -1;
              result = testInstaller.generateOutput(sortedResults);
              expect(result).toEqual("The dependency list contained a cycle. Please resolve the cycle and resubmit.")
          });
                      
      });
              
  });
      
  
  describe('should take in input and return final output', () => {
      var dependencies;
      var result;

      
        it('should generate a valid response for valid data', () => {
            dependencies = [ "KittenService: CamelCaser", "CamelCaser: " ]
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
          
      
      it('should generate a valid response for invalid data', () => {
            dependencies = [
                "KittenService: ",
                "Leetmeme: Cyberportal",
                "Cyberportal: Ice",
                "CamelCaser: KittenService",
                "Fraudstream: ",
                "Ice: Leetmeme"
            ]

            result = testInstaller.main(dependencies);
            expect(result).toEqual("The dependency list contained a cycle. Please resolve the cycle and resubmit.");
      });

  });
        
});
  