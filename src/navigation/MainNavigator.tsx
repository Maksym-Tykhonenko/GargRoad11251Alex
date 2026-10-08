import React from 'react';

import {CalculatorsProvider} from '../context/CalculatorsContext';
import {LearnProvider} from '../context/LearnContext';
import {KnowledgeProvider} from '../context/KnowledgeContext';
import {RecordsProvider} from '../context/RecordsContext';
import {RootTabs} from './RootTabs';

export function MainNavigator() {
  return (
    <CalculatorsProvider>
      <RecordsProvider>
        <LearnProvider>
          <KnowledgeProvider>
            <RootTabs />
          </KnowledgeProvider>
        </LearnProvider>
      </RecordsProvider>
    </CalculatorsProvider>
  );
}
