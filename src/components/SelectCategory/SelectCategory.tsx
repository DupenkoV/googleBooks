import React from 'react';
import { Select, Space } from 'antd';

const { Option } = Select;

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

export const SelectCategory: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Select
      mode="multiple"
      style={{ width: '50%' }}
      placeholder="Выберите категорию"
      defaultValue={['all']}
      onChange={handleChange}
      optionLabelProp="label">
      <Option value="all" label="all">
        <Space>
          <span aria-label="all">all</span>
        </Space>
      </Option>
      <Option value="art" label="art">
        <Space>
          <span aria-label="art">art</span>
        </Space>
      </Option>
      <Option value="biography" label="biography">
        <Space>
          <span aria-label="biography">biography</span>
        </Space>
      </Option>
      <Option value="computers" label="computers">
        <Space>
          <span aria-label="computers">computers</span>
        </Space>
      </Option>
      <Option value="history" label="history">
        <Space>
          <span aria-label="history">history</span>
        </Space>
      </Option>
      <Option value="medical" label="medical">
        <Space>
          <span aria-label="medical">medical</span>
        </Space>
      </Option>
      <Option value="poetry" label="poetry">
        <Space>
          <span aria-label="poetry">poetry</span>
        </Space>
      </Option>
    </Select>
    <Select
      defaultValue={'relevance'}
      style={{ width: 240 }}
      options={[
        {
          value: 'relevance',
          label: 'relevance',
        },
        {
          value: 'newest',
          label: 'newest',
        },
      ]}
    />
  </div>
);
