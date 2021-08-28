import React from 'react'

import { useRecoilState } from 'recoil'
import { globalStateAtom } from '@atoms/globalStateAtom'
import { AllTrainAnnouncementSystems } from '@announcement-data/AllSystems'

interface SystemListItem {
  id: string
  name: string
}
const AllAnnouncementSystems = AllTrainAnnouncementSystems.reduce((acc, sys) => {
  const system = new sys()
  return [...acc, { id: system.ID, name: system.NAME }]
}, [] as SystemListItem[])

function MainSelector(): JSX.Element {
  const [globalState, setGlobalState] = useRecoilState(globalStateAtom)

  return (
    <div>
      <label htmlFor="system-select">
        Choose a system
        <select
          id="system-select"
          value={globalState.systemId || ''}
          onChange={e => {
            setGlobalState({ ...globalState, systemId: e.currentTarget.value })
          }}
        >
          <option key="" value="none">
            None
          </option>

          {AllAnnouncementSystems.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default MainSelector
