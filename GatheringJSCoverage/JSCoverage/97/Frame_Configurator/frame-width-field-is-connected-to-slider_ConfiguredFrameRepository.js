import { LocalStorageUtil } from "../util/LocalStorageUtil.js";
import { ConfiguredFrame } from "../model/ConfiguredFrame.js";
export class ConfiguredFrameRepository {
    getAllFrames() {
        let allFrames = [];
        let allFramesFromStorage = LocalStorageUtil.retrieve(ConfiguredFrameRepository.LOCALSTORAGE_KEY);
        if (allFramesFromStorage !== null) 
        return allFrames;
    }
    
    /**
     * Store a frame in localStorage.
     * It will be stored at the end of the list.
     *
     * Adding more than one frame for one objectID is not supported.
     * If a frame with the given objectID is already inside the cart, it will be removed and re-added at the end.
     * @param frame
     */
    
    
    
}
ConfiguredFrameRepository.LOCALSTORAGE_KEY = 'cart';
