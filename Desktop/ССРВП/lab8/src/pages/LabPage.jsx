import { useParams, Navigate } from 'react-router-dom';
import Content from '../components/Content';

/** Страница-обёртка: достаём :id из URL и передаём в Content */
function LabPage() {
  const { id } = useParams();
  const labId = parseInt(id, 10);

  if (isNaN(labId)) return <Navigate to="/" replace />;

  return <Content selectedId={labId} />;
}

export default LabPage;
