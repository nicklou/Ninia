import primitives = require('./primitives');
import True = primitives.True;
import False = primitives.False;
import interfaces = require('./interfaces');
import IPy_Object = interfaces.IPy_Object;
import enums = require('./enums');

// This file is split apart from builtins.ts to avoid circular dependencies.

// We don't export this, so our instances will be singleton-ish.
class SingletonClass implements IPy_Object {
    constructor(private name: string) {}
    toString(): string {
        return this.name;
    }
    getType(): enums.Py_Type { return enums.Py_Type.OTHER; }
    // XXX: Should be fixed.
    hash(): number { return -1; }
    __str__(): primitives.Py_Str {
        return primitives.Py_Str.fromJS(this.name);
    }
}

// Python has a single null object called "None".
class NoneType extends SingletonClass{
  asBool(): boolean {
    return false;
  }
}
export var None = new NoneType("None");

// Ellipsis is the object corresponding to the ... syntax.
export var Ellipsis = new SingletonClass("Ellipsis");

// Python uses "NotImplemented" to signal that some operation (e.g. addition,
// less-than) is not supported for a particular set of arguments. Typically the
// reverse operation is tried (e.g. add => radd). If that also returns
// NotImplemented, the interpreter throws an error.
export var NotImplemented = new SingletonClass("NotImplemented");
