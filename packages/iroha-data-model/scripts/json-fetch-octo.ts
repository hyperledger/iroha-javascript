import consola from 'consola';
import { Octokit } from '@octokit/core';
import { Seq } from 'immutable';
import axios from 'axios';

const kit = new Octokit();

interface GithubRepoId {
    owner: string;
    repo: string;
}

async function getLastSuccessWorkflowRun({
    owner,
    repo,
    workflowId,
}: GithubRepoId & {
    workflowId: number;
}): Promise<{ val: number } | null> {
    const {
        data: { workflow_runs },
    } = await kit.request('GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs', {
        owner,
        repo,
        workflow_id: workflowId,
    });

    return Seq(workflow_runs)
        .filter((x) => x.conclusion === 'success')
        .map(({ id }) => ({ val: id }))
        .first(null);
}

async function getWorkflowRunArtifacts({ owner, repo, workflowRunId }: GithubRepoId & { workflowRunId: number }) {
    const {
        data: { artifacts },
    } = await kit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts', {
        owner,
        repo,
        run_id: workflowRunId,
    });

    return artifacts;
}

async function fetchSchemaArtifact({
    owner,
    repo,
    artifactId,
}: GithubRepoId & { artifactId: number }): Promise<string> {
    console.log({ owner, repo, artifactId });

    const { data } = await kit.request('GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}', {
        owner,
        repo,
        artifact_id: artifactId,
        archive_format: 'zip',
    });

    console.log({ data });
}

/**
 * WIP
 */
async function main() {
    const config = {
        owner: 'hyperledger',
        repo: 'iroha',

        /**
         * "Iroha 2 dev branch workflow" id from https://api.github.com/repos/hyperledger/iroha/actions/workflows
         */
        workflowId: 3751741,
    };

    consola.info('Fetching last success run for workflow %o in %s/%s...', config.workflowId, config.owner, config.repo);
    const maybeId = await getLastSuccessWorkflowRun(config);
    if (!maybeId) {
        consola.error('Last workflow (with id %o) run not found', config.workflowId);
        throw new Error('No workflow run');
    }
    consola.info('Run id is: %o', maybeId.val);

    consola.info('Fetching artifacts for %o', maybeId.val);
    const artifacts = await getWorkflowRunArtifacts({
        ...config,
        workflowRunId: maybeId.val,
    });
    const schemaArtifact = Seq(artifacts).find((x) => x.name === 'schema');
    if (!schemaArtifact) {
        consola.error({ artifacts });
        throw new Error('"schema" artifact not found');
    }
    consola.info('Fetching artifact %o from %o', schemaArtifact.id, schemaArtifact.archive_download_url);

    await axios
        .get(schemaArtifact.archive_download_url)
        .then((x) => {
            console.log(x.status, x.data);
        })
        .catch((err) => {
            consola.error('%s | %o', err.message, err.response.data);
        });
}

main().catch((err) => {
    consola.fatal(err);
    process.exit(1);
});
