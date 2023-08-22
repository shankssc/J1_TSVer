import React, { useState } from 'react';
import { Layout, Input, Icon } from '@ui-kitten/components';
import { SearchIcon, FilterIcon } from './Icons';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (query:string) => {
    setSearchQuery(query);
    // Perform your search logic here using the query
  };

  return (
    <Layout>
      <Input
        style={{
            
        }}
        value={searchQuery}
        placeholder="Search J1"
        accessoryLeft={(props) => (
          <SearchIcon />
        )}
        accessoryRight={(props) => (
            <FilterIcon />
        )}
        onChangeText={handleSearchChange}
      />
    </Layout>
  );
};

export default SearchBar;
