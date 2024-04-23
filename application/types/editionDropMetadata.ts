import { BigNumber } from "ethers";
import { StaticJsonRpcBatchProvider } from "@thirdweb-dev/sdk";

type editionDropMetadat = {
    metadata:{
        [x: string] : StaticJsonRpcBatchProvider;
    }
    supply: BigNumber
}

export default editionDropMetadat;