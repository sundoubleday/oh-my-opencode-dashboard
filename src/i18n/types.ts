// i18n Type Definitions
export type Locale = 'en' | 'zh';

export interface Translations {
  dashboard: {
    title: string;
    subtitle: string;
    localOnly: string;
    servedFrom: string;
  };
  timeseries: {
    title: string;
    last5min: string;
    mainAgents: string;
    backgroundTotal: string;
    timeLabels: {
      minus5: string;
      minus4: string;
      minus3: string;
      minus2: string;
      minus1: string;
      now: string;
    };
  };
  session: {
    title: string;
    agent: string;
    currentTool: string;
    currentModel: string;
    lastUpdated: string;
    sessionLabel: string;
  };
  plan: {
    title: string;
    name: string;
    progress: string;
    path: string;
    showSteps: string;
    hideSteps: string;
    noSteps: string;
  };
  tokens: {
    title: string;
    modelBreakdown: string;
    noUsage: string;
    total: string;
    headers: {
      model: string;
      input: string;
      output: string;
      reasoning: string;
      cacheRead: string;
      cacheWrite: string;
    };
  };
  tasks: {
    mainTitle: string;
    backgroundTitle: string;
    noMainTasks: string;
    noBackgroundTasks: string;
    headers: {
      description: string;
      agent: string;
      lastModel: string;
      status: string;
      toolCalls: string;
      lastTool: string;
      timeline: string;
    };
  };
  toolCalls: {
    title: string;
    metadataOnly: string;
    loading: string;
    noRecords: string;
    noSessionId: string;
    capped: string;
    truncated: string;
  };
  status: {
    live: string;
    disconnected: string;
    busy: string;
    running: string;
    error: string;
    queued: string;
    done: string;
    cancelled: string;
    unknown: string;
    notStarted: string;
    inProgress: string;
    waiting: string;
    thinking: string;
  };
  actions: {
    switchToLight: string;
    switchToDark: string;
    switchToChinese: string;
    switchToEnglish: string;
    soundOn: string;
    soundOff: string;
    enableSound: string;
    disableSound: string;
    playDing: string;
    copyJson: string;
    copied: string;
    copyFailed: string;
    expand: string;
    collapse: string;
    rawJson: string;
  };
  common: {
    justNow: string;
    never: string;
    noDescription: string;
    noSources: string;
    source: string;
    version: string;
  };
  errors: {
    apiNotReachable: string;
    connectionLost: string;
  };
}
