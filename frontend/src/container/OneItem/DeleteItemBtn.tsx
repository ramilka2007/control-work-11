import React from 'react';
import { AllItems } from '../../types';
import { LoadingButton } from '@mui/lab';

interface Props {
  item: AllItems;
  user: string | null;
  deleteItem: (id: string) => void;
  loading: boolean;
}
const DeleteItemBtn: React.FC<Props> = ({
  user,
  deleteItem,
  item,
  loading,
}) => {
  return (
    <>
      {user === item.user._id ? (
        <LoadingButton
          loading={loading}
          onClick={() => deleteItem(item._id)}
          className="btn btn-danger"
        >
          Delete
        </LoadingButton>
      ) : null}
    </>
  );
};

export default DeleteItemBtn;
