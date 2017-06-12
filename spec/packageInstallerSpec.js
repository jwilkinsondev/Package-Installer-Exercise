  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });


describe('package installer exercise specs', () => {
  var PackageInstaller = require('../src/packageInstaller');
  var testInstaller
  beforeEach(() => {
    testInstaller = new PackageInstaller();
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
    
});
  