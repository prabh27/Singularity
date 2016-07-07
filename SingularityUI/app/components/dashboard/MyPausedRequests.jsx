import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap';

import UITable from '../common/table/UITable';
import { RequestId, Type, LastDeploy, Actions } from '../requests/Columns';

import * as RequestsActions from '../../actions/api/requests';
import * as RequestsSelectors from '../../selectors/requests';

const MyPausedRequests = ({userRequests, unpauseAction, removeAction}) => {
  let pausedRequestsSection = (
    <div className="empty-table-message"><p>No paused requests</p></div>
  );

  const pausedRequests = userRequests.filter((r) => r.state === 'PAUSED');

  if (pausedRequests.length > 0) {
    pausedRequestsSection = (
      <UITable
        data={pausedRequests}
        keyGetter={(r) => r.request.id}
        asyncSort={true}
        paginated={true}
        rowChunkSize={10}
      >
        {RequestId}
        {Type}
        {LastDeploy}
        {Actions(removeAction, unpauseAction)}
      </UITable>
    );
  }

  return (
    <Row>
      <Col md={12} className="table-staged">
        <div className="page-header">
          <h2>My paused requests</h2>
        </div>
        {pausedRequestsSection}
      </Col>
    </Row>
  );
};

MyPausedRequests.propTypes = {
  userRequests: PropTypes.arrayOf(PropTypes.object).isRequired,
  unpauseAction: PropTypes.func.isRequired,
  removeAction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    userRequests: RequestsSelectors.getUserRequests(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    unpauseAction: (requestId, message) => {
      dispatch(RequestsActions.UnpauseRequest.trigger(requestId, message));
    },
    removeAction: (requestId, message) => {
      dispatch(RequestsActions.RemoveRequest.trigger(requestId, message));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPausedRequests);