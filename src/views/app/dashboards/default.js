import React from 'react';
import { injectIntl } from 'react-intl';
import { 
  Row, 
  // Card, 
  // CardBody, 
  // CardTitle, 
  // Table 
} from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
// import IntlMessages from '../../../helpers/IntlMessages';
import {
  ReactTableWithPaginationCard,
  ReactTableAbsen,
  ReactTableWithMasterDataLokasi,
  ReactTableWithMasterDataArea,
  // ReactTableDivided,
} from '../../../containers/ui/ReactTableCards';

const DefaultDashboard = ({ intl, match }) => {
  // const { messages } = intl;

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.default" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <ReactTableWithPaginationCard />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <ReactTableAbsen />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <h3 className="mb-4">Master Data</h3>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="6">
          <ReactTableWithMasterDataLokasi />
        </Colxx>
        <Colxx xxs="6">
          <ReactTableWithMasterDataArea />
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(DefaultDashboard);
