"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoilExternalStatePortal = exports.setRecoilExternalState = exports.getRecoilExternalLoadable = void 0;
// RecoilExternalStatePortal.tsx
const recoil_1 = require("recoil");
/**
 * Returns a Recoil state value, from anywhere in the app.
 *
 * Can be used outside of the React tree (outside a React component), such as in utility scripts, etc.

 * <RecoilExternalStatePortal> must have been previously loaded in the React tree, or it won't work.
 * Initialized as a dummy function "() => null", it's reference is updated to a proper Recoil state mutator when RecoilExternalStatePortal is loaded.
 *
 * @example const lastCreatedUser = getRecoilExternalLoadable(lastCreatedUserState);
 */
let getRecoilExternalLoadable = () => null;
exports.getRecoilExternalLoadable = getRecoilExternalLoadable;
/**
 * Sets a Recoil state value, from anywhere in the app.
 *
 * Can be used outside of the React tree (outside a React component), such as in utility scripts, etc.
 *
 * <RecoilExternalStatePortal> must have been previously loaded in the React tree, or it won't work.
 * Initialized as a dummy function "() => null", it's reference is updated to a proper Recoil state mutator when RecoilExternalStatePortal is loaded.
 *
 * @example setRecoilExternalState(lastCreatedUserState, newUser)
 */
let setRecoilExternalState = () => null;
exports.setRecoilExternalState = setRecoilExternalState;
/**
 * Utility component allowing to use the Recoil state outside of a React component.
 *
 * It must be loaded in the _app file, inside the <RecoilRoot> component.
 * Once it's been loaded in the React tree, it allows using setRecoilExternalState and getRecoilExternalLoadable from anywhere in the app.
 *
 * @see https://github.com/facebookexperimental/Recoil/issues/289#issuecomment-777300212
 * @see https://github.com/facebookexperimental/Recoil/issues/289#issuecomment-777305884
 * @see https://recoiljs.org/docs/api-reference/core/Loadable/
 */
function RecoilExternalStatePortal() {
    // We need to update the getRecoilExternalLoadable every time there's a new snapshot
    // Otherwise we will load old values from when the component was mounted
    (0, recoil_1.useRecoilTransactionObserver_UNSTABLE)(({ snapshot }) => {
        exports.getRecoilExternalLoadable = snapshot.getLoadable;
    });
    // We only need to assign setRecoilExternalState once because it's not temporally dependent like "get" is
    (0, recoil_1.useRecoilCallback)(({ set }) => {
        exports.setRecoilExternalState = set;
        return () => __awaiter(this, void 0, void 0, function* () { });
    })();
    return <></>;
}
exports.RecoilExternalStatePortal = RecoilExternalStatePortal;
