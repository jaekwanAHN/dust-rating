import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { IconType } from 'react-icons/lib';

interface SelectTabListProps {
  selectTabList: string[];
  handleClickTab: (e: MouseEvent<HTMLButtonElement>) => void;
  selectOption?: { options: string; icon: IconType }[];
  handleClickOption?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const SelectTabList = ({
  selectTabList,
  handleClickTab,
  selectOption,
  handleClickOption,
}: SelectTabListProps) => {
  return (
    <>
      <Tabs
        width="100%"
        variant="soft-rounded"
        colorScheme="gray"
        my={4}
        isFitted
      >
        <TabList>
          {selectTabList.map((tabItem) => (
            <Tab
              key={tabItem}
              value={tabItem}
              fontSize={{ base: 14, sm: 16 }}
              onClick={handleClickTab}
            >
              {tabItem}
            </Tab>
          ))}
        </TabList>
      </Tabs>
      <Tabs
        width="50%"
        variant="soft-rounded"
        colorScheme="gray"
        mb={4}
        isFitted
      >
        {selectOption && (
          <TabList>
            {selectOption.map((tabItem) => (
              <Tab
                key={tabItem.options}
                value={tabItem.options}
                fontSize={{ base: 14, sm: 16 }}
                onClick={handleClickOption}
              >
                {tabItem.options}
                <tabItem.icon />
              </Tab>
            ))}
          </TabList>
        )}
      </Tabs>
    </>
  );
};

export default SelectTabList;
