import { useLoaderData, useNavigate } from 'react-router-dom';
import EmptyWorkspaces from '../components/EmptyWorkspaces';

import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';

export interface ICohort {
  cohort: string;
  course: string;
  student: string;
  desiredCount?: number;
  name?: string;
}

const Cohorts = () => {
  const navigate = useNavigate();
  let cohorts = useLoaderData();

  const CohortTable = () => {
    return (
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Cohort Name</Th>
              <Th>Cohort Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cohorts.map(cohort => {
              return (
                <Tr key={cohort.id}>
                  <Td onClick={e => navigate(`/cohort/${cohort.id}`)}>
                    {cohort.name}
                  </Td>
                  <Td>Active</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <AdminPrivateRoute>
      <Heading mb={'20px'}>All Cohorts</Heading>
      {cohorts.length ? CohortTable() : EmptyWorkspaces('cohorts')}
    </AdminPrivateRoute>
  );
};

export default Cohorts;
