import { Alert } from "react-native";
import { ActivityTypeControllerInterface } from "../interfaces/activityTypeInterfaces/ActivityTypeControllerInterface";
import { ActivityTypeModel } from "../models/ActivityTypeModel";
import ActivityTypeDatabaseService from "../services/ActivityTypeDatabaseService";
import {activityTypePersistenceInTheDatabase} from '../validations/ActivityTypeValidations/ActivityTypePersistenceInTheDatabase';

class ActivityTypeController implements ActivityTypeControllerInterface {
    async findAllActivitiesTypes(): Promise<ActivityTypeModel[]> {
        let activitiesTypes: ActivityTypeModel[] = await ActivityTypeDatabaseService.findAll();
        return activitiesTypes
    }

    async deleteActivityType(id: number) {
        try {
          if ( await activityTypePersistenceInTheDatabase.IsActivityTypeAlreadRegisteredForAnActivity(id)) {
            let isItemDeleted = await ActivityTypeDatabaseService.deleteActivityType(id);
    
            if (isItemDeleted == true) {
              Alert.alert("Sucesso", "Registro excluído com sucesso");
            }
            else {
              Alert.alert("Erro", "Não foi possível remover o registro.");
            }
          }
          else{
            Alert.alert("Alerta", `Já existe uma atividade cadastrada relaciona com o tipo a ser excluído. 
              Exclua primeiro a atividade relactionada ao tipo de atividade que se deseja exluir`);
          }
        }
        catch (error) {
          console.log(error);
          Alert.alert("Ocorreu um erro ao excluir o tipo de atividade. Consulte o log.");
        }
      }
}

export const activityTypeController = new ActivityTypeController();