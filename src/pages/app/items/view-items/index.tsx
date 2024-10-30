import { ReactElement } from "react";
import Layout from "~/modules/layout/templates";
import { NextPageWithLayout } from "~/types/global";


const ViewItems: NextPageWithLayout = () => {
    return(
        <div>Items</div>
    )
}

ViewItems.getLayout = (page:ReactElement) => {
    return <Layout>{page}</Layout>
}

export default ViewItems;