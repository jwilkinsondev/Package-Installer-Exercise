
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
      //testInstaller = {};
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

  
  xdescribe('validate the input', () => {
      
      xit('should only accept arrays', () => {
          testInstaller.m_savedInputString = [];
          expect(testInstaller.validateInput()).toEqual(true);
          testInstaller.m_savedInputString = "stuff";
          expect(testInstaller.validateInput()).toEqual(false);
      });
      
      xit('should only accept input that does not have dependency loops', () => {
          var valid =  [
                "KittenService: ",
                "Leetmeme: Cyberportal",
                "Cyberportal: Ice",
                "CamelCaser: KittenService",
                "Fraudstream: Leetmeme",
                "Ice: "
            ];
          var invalid = [
                "KittenService: ",
                "Leetmeme: Cyberportal",
                "Cyberportal: Ice",
                "CamelCaser: KittenService",
                "Fraudstream: ",
                "Ice: Leetmeme"
            ]
          expect(testInstaller.checkForDependencyLoops(valid)).toBe(true);
          expect(testInstaller.checkForDependencyLoops(invalid)).toBe(false);
      });
          
          
  });

  
  describe('generate output', () => {
      var dependencies;
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
              expect(result).toEqual("CamelCaser, KittenService");
          });

          
          it('should handle dependency loops', () => {
              
          });
              
              
      });
          
          
  });
      
    
});
  