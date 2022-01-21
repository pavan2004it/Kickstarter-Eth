import React , {Component} from "react";
import Layout from "../../components/Layout";
import campaignAddress from "../../ethereum/campaign";
import {Card, Grid, Button} from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/contributeForm";
import { Link } from "../../routes";


class CampaignShow extends Component{
    static async getInitialProps(props){
        const campaign = campaignAddress(props.query.address)
        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            managerAddress: summary[4]
        };
    }

    renderCards(){
        const {
            minimumContribution,
            balance,
            requestsCount,
            approversCount,
            managerAddress
        } = this.props;

        const items = [
            {
                header: managerAddress,
                meta: 'Address of Manager',
                description: 'The Manager created the campaign and can place a request to withdraw campaign funds',
                style: {overflowWrap: 'break-word'}

            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must at least contribute this much wei to become a contributor',
                style: {overflowWrap: 'break-word'}

            },
            {
                header: requestsCount,
                meta: 'Number of requests',
                description: 'A request tries to withdraw money from the contract. It needs to be approved by a majority of approvers',
                style: {overflowWrap: 'break-word'}

            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already contributed',
                style: {overflowWrap: 'break-word'}

            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: 'Campaign Balance',
                description: 'The balance is how much money this campaign as left to spend',
                style: {overflowWrap: 'break-word'}

            }
        ];
        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>New Campaign</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>

                    </Grid.Row>

                </Grid>
            </Layout>

        );
    }
}

export default CampaignShow;