import { Mission } from "../MissionsTable/types"

export type MissionRowProps = {
    id: Mission['id']
    name: Mission['name']
    date: Mission['createdAt']
    selectionCriteria: Mission['customSelectionCriteria']
    resumeFolderUrl: Mission['resumeFolderUrl']
    reportUrl: Mission['reportUrl']
    status: Mission['status']
}