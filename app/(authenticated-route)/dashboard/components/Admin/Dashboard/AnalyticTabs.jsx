import { AnalyticWordsCount } from "@/data/analytics/analytics";
import Tabs from "./TabsComponent";
import DictionaryPlays from "./components/DictionaryPlays";
import TranslationAnalytics from "./components/TranslationAnalytics";
import { TranslationCounts } from "@/data/analytics/translation-analytics";

export default async function Analytics() {
    const tabs = ["Translation Content", "Dictionary Plays"];
    const wordAnalytics = await AnalyticWordsCount();
    const translationAnalytics = await TranslationCounts();

    const analytics = wordAnalytics.slice(0, 10);

    const translation = [];

    return (
        <div className="w-full flex flex-col items-center bg-gray-100 rounded-xl p-8 shadow-md h-full">
            <Tabs tabs={tabs} defaultTab="Translation Content">
                {{
                    "Translation Content": (
                        <TranslationAnalytics translation={translation} translationData={translationAnalytics} />
                    ),
                    "Dictionary Plays": (
                        <DictionaryPlays analytics={analytics} />
                    ),
                }}
            </Tabs>
        </div>
    );
};
