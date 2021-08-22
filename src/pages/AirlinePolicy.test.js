const AirlinePolicy = require("./AirlinePolicy")
// @ponicode
describe("getInitialState", () => {
    let inst

    beforeEach(() => {
        inst = new AirlinePolicy.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.getInitialState()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("display", () => {
    let inst

    beforeEach(() => {
        inst = new AirlinePolicy.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.display(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.display(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.display(100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.display(-5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.display(-100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.display(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("liClass", () => {
    let inst

    beforeEach(() => {
        inst = new AirlinePolicy.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.liClass(-100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.liClass(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.liClass(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.liClass(100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.liClass(-5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.liClass(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentWillMount", () => {
    let inst

    beforeEach(() => {
        inst = new AirlinePolicy.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentWillMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
