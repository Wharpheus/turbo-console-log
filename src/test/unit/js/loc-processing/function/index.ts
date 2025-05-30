import { describe } from 'mocha';
import anonymousTest from './anonymous.test';
import assignmentTest from './assignment.test';
import builtInFunctionInvocation from './built-in-function-invocation.test';
import functionNameTest from './function-name.test';
import namedFunctionDeclaration from './named-function-declaration.test';
import objectFunctionCallTest from './object-function-call.test';
import functionCallTest from './function-call.test';
import typedFunctionCallTests from './typed-function-call.test';
import functionObjPropAssignmentTests from './object-property-assignment.test';

export default (): void => {
  describe('Function LOC processing', () => {
    anonymousTest();
    assignmentTest();
    builtInFunctionInvocation();
    functionNameTest();
    namedFunctionDeclaration();
    objectFunctionCallTest();
    functionCallTest();
    functionObjPropAssignmentTests();
    typedFunctionCallTests();
  });
};
