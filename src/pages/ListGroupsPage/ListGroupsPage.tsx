import { useQuerySchools } from './useQueryGroups';
import { CreateGroupForm, CreateGroupFormData } from './CreateGroupForm/';
import { UpdateGroupForm, UpdateGroupFormData } from './UpdateGroupForm';
import { RemoveGroupForm } from './RemoveGroupForm/';
import { useCreateGroup } from './useCreateGroup';
import { useUpdateGroup } from './useUpdateGroup';
import { useRemoveGroup } from './useRemoveGroup';
import { GroupMachineState, useGroupMachine } from './useGroupMachine';
import { ShareGroupSection } from './ShareGroupSection';
import {
  Button,
  NoDataMessage,
  GroupCard,
  GroupCardLoader,
  Section,
  Modal,
} from '@/components';
import { PlusCircle } from '@/components/icons';
import { useAuthContext } from '@/contexts/auth';
import { Group } from '@/api/group';
import placeholderImg from '@/assets/placeholder_view.png';

const titleMap: Record<GroupMachineState['status'], string> = {
  idle: '',
  creating: 'Novo grupo',
  updating: 'Editar grupo',
  removing: 'Remover grupo',
  sharing: 'Compartilhar grupo',
};

export default function ListGroupsPage() {
  const { user } = useAuthContext();

  const {
    state,
    isIdle,
    isCreating,
    isUpdating,
    isRemoving,
    isSharing,
    dispatchCreate,
    dispatchUpdate,
    dispatchRemove,
    dispatchIdle,
    dispatchSharing,
  } = useGroupMachine();

  const {
    isLoading,
    isRefetching,
    isSuccess,
    data: groups,
    refetch,
  } = useQuerySchools();

  const { mutateAsync: createGroup, isLoading: isLoadingCreate } =
    useCreateGroup(dispatchIdle);

  const { mutateAsync: updateGroup, isLoading: isLoadingUpdate } =
    useUpdateGroup(dispatchIdle);

  const { mutateAsync: removeGroup, isLoading: isLoadingRemove } =
    useRemoveGroup(dispatchIdle);

  const hasData = groups && groups.length;
  const currentGroup = groups?.find(
    (group) => group.token === state.id,
  ) as Group;

  return (
    <Section.Root>
      <Section.Title>Boas-vindas, {user?.firstname}!</Section.Title>
      <div className='flex justify-between mb-6 items-center'>
        <Section.Subtitle>Seus grupos:</Section.Subtitle>
        <Button
          size='sm'
          onClick={() => dispatchCreate()}
          leftIcon={<PlusCircle className='h-5 w-5' />}
        >
          Novo grupo
        </Button>
      </div>

      <Section.Content
        grow={!hasData && !isLoading}
        className='<lg:justify-center gap-6'
      >
        {isLoading ? <GroupCardLoader quantity={3} /> : null}

        {isSuccess && hasData
          ? groups.map((group) => (
              <GroupCard
                to={`/group/${group.token}`}
                key={group.token}
                title={group.nome}
                subtitle={group.endereco}
                onUpdateButtonClick={() => dispatchUpdate(group.token)}
                onDeleteButtonClick={() => dispatchRemove(group.token)}
                onShareButtonClick={() => dispatchSharing(group.token)}
                src={placeholderImg}
                alt='placeholder'
              />
            ))
          : null}

        {isLoading || hasData ? null : (
          <NoDataMessage
            message='Nenhum grupo encontrado'
            onRetryButtonClick={refetch}
            loading={isRefetching}
          />
        )}
      </Section.Content>

      <Modal
        title={titleMap[state.status]}
        open={!isIdle}
        onOpenChange={dispatchIdle}
      >
        {isCreating ? (
          <CreateGroupForm
            onSubmit={(data: CreateGroupFormData) => createGroup(data)}
            loading={isLoadingCreate}
          />
        ) : null}

        {isUpdating ? (
          <UpdateGroupForm
            onSubmit={(data: UpdateGroupFormData) =>
              updateGroup({ ...data, token: state.id })
            }
            defaultValues={{
              endereco: currentGroup?.endereco,
              nome: currentGroup?.nome,
            }}
            loading={isLoadingUpdate}
          />
        ) : null}

        {isRemoving ? (
          <RemoveGroupForm
            onSubmit={() => removeGroup(currentGroup)}
            loading={isLoadingRemove}
            onNoButtonClick={dispatchIdle}
          />
        ) : null}

        {isSharing ? <ShareGroupSection group={currentGroup} /> : null}
      </Modal>
    </Section.Root>
  );
}
