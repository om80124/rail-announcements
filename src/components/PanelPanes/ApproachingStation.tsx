import React from 'react'

import { makeStyles } from '@material-ui/styles'
import getActiveSystem from '@helpers/getActiveSystem'
import createOptionField from '@helpers/createOptionField'
import { AllStationsTitleValueMap } from '@data/StationManipulators'

const useStyles = makeStyles({
  root: {
    padding: 16,
    backgroundColor: '#eee',
    marginTop: 24,
  },
})

function ApproachingStation(): JSX.Element {
  const classes = useStyles()

  const AnnouncementSystem = getActiveSystem()
  if (!AnnouncementSystem) return null
  const AnnouncementSystemInstance = new AnnouncementSystem()

  const AvailableLowStations = React.useMemo(
    () => AllStationsTitleValueMap.filter(s => AnnouncementSystemInstance.AvailableStationNames.low.includes(s.value)),
    [AnnouncementSystem, AllStationsTitleValueMap],
  )

  const opts = AnnouncementSystemInstance.approachingStationAnnouncementOptions
  const standardOptions = {
    nextStationCode: AvailableLowStations[0].value,
  }

  const [optionsState, setOptionsState] = React.useState<Record<string, unknown>>(
    Object.entries(opts).reduce((acc, [key, opt]) => ({ ...acc, [key]: opt.default }), standardOptions),
  )
  const [isDisabled, setIsDisabled] = React.useState(false)

  function createFieldUpdater(field: string): (value) => void {
    return (value): void => {
      setOptionsState(prevState => ({ ...prevState, [field]: value }))
    }
  }

  return (
    <div className={classes.root}>
      {isDisabled && (
        <p>
          <strong>All options are disabled while an announcement is playing.</strong>
        </p>
      )}
      <fieldset>
        <h3>Standard options</h3>

        {createOptionField(
          {
            name: 'Next station',
            default: AvailableLowStations[0].value,
            type: 'select',
            options: AvailableLowStations,
          },
          { onChange: createFieldUpdater('nextStationCode'), value: optionsState.nextStationCode, key: 'nextStation' },
        )}
      </fieldset>
      <fieldset>
        <h3>Custom options</h3>

        {Object.keys(opts).length === 0 && <p>No options</p>}

        <>
          {Object.entries(opts).map(([key, opt]) =>
            createOptionField(opt, { onChange: createFieldUpdater(key), value: optionsState[key], key }),
          )}
        </>
      </fieldset>
      <button
        onClick={async () => {
          setIsDisabled(true)

          AnnouncementSystemInstance.playApproachingStationAnnouncement(optionsState.nextStationCode as string, {
            isAto: optionsState.isAto as boolean,
            exchangePOIs: optionsState.exchangePOIs as string[],
          })

          setIsDisabled(false)
        }}
      >
        Play announcement
      </button>
    </div>
  )
}

export default ApproachingStation
