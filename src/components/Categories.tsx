import { Table, Button } from 'antd';
import { InfoCircleOutlined, DeleteOutlined, EditOutlined, ShoppingCartOutlined, LikeOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { addlike, deleteCategory, getAllCategories, removelike, toggleBasket, type Category } from '../features/Categories'; 
import { useEffect, useState } from 'react';
import { Edit } from './Edit';


function Categories() {

    const {entities, status, liked, basket} = useSelector((state: RootState) => state.categories);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(0);

    console.log(status)

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: any, record: Category) => (
          <div className="flex space-x-2">
            <Button
              icon={<InfoCircleOutlined />}
              title="Info"
              onClick={() => console.log('Info clicked for:', record)}
            />
            <Button
              icon={<EditOutlined />}
              title="Edit"
              onClick={() =>{
                setEdit(!edit)
                setId(record.id);
            }}
            />
            <Button
              icon={status.delete == "pending" ? <LoadingOutlined /> :  <DeleteOutlined />}
              title={"delete"}
              danger
              onClick={() => dispatch<any>(deleteCategory(record.id))}
            />
            <Button
              icon={<ShoppingCartOutlined />}
              title="Add to Basket"
              className={`${basket.some((l: any) => l.id == record.id) ? "bg-yellow-400" : ""} `}
              onClick={() => dispatch(toggleBasket(record))}
            />
            <Button
              icon={<LikeOutlined />}
              title="Like"
              className={`${liked.some((l: any) => l.id == record.id) ? "bg-red-400" : ""} `}
              onClick={() => {
                    if (liked.some((l: any) => l.id == record.id)) {
                        dispatch<any>(removelike(record.id));
                    } else {
                        dispatch<any>(addlike(record));
                    }
              }}
            />
          </div>
        ),
      },
    ];

    useEffect(() => {
        if (status.fetch === 'idle') {
            dispatch<any>(getAllCategories());
        };
    }, []);


    return (
        <div className='w-full flex items-center justify-center flex-col'>
            {
                status.fetch === 'loading' ? <h1>Loading...</h1> : status === 'failed' ? <h1>Error Occured</h1> : null
            }
            {
                status.fetch === 'succeeded' && 
                <Table 
                    dataSource={entities} 
                    columns={columns} 
                    className='w-[80%] mt-10' 
                    rowKey="id" 
                />
            }
            {
              edit && <Edit id={id} setEdit={setEdit}/>
            }
        </div>
    );
};

export { Categories };
