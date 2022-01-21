import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xe59e0844aB0C49D532632cd87434a46a787875B6"
);

export default instance;