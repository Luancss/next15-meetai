interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  return (
    <div>
      <h1>Agent ID: {agentId}</h1>
    </div>
  );
};
