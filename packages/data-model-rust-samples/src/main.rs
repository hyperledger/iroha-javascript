use iroha_data_model::prelude::*;
use parity_scale_codec::Encode;
use serde::Serialize;
use std::collections::HashMap;
use std::fmt::Debug;
use std::str::FromStr;
use std::time::Duration;

fn main() {
    println!(
        "{}",
        SamplesMap::new()
            .add("DomainId", &DomainId::new("Hey").unwrap())
            .add(
                "AssetDefinitionId",
                &AssetDefinitionId::new("rose", "wonderland").unwrap()
            )
            .add(
                "AccountId",
                &AccountId::new("alice", "wonderland").expect("Valid")
            )
            .add(
                "Time-based Trigger ISI",
                &create_some_time_based_trigger_isi()
            )
            .add(
                "Event-based Trigger ISI",
                &create_some_event_based_trigger_isi()
            )
            .to_json()
    );
}

#[derive(Debug, Serialize)]
struct Sample {
    debug: String,
    encoded: String,
}

impl Sample {
    fn new<T: Encode + Debug>(something: &T) -> Self {
        let encoded = Encode::encode(something);
        let encoded = to_hex(&encoded);

        Self {
            debug: format!("{:?}", something),
            encoded,
        }
    }
}

struct SamplesMap(HashMap<String, Sample>);

impl SamplesMap {
    fn new() -> Self {
        Self(HashMap::new())
    }

    fn add<T: Encode + Debug>(&mut self, label: &str, something: &T) -> &mut Self {
        self.0.insert(label.to_owned(), Sample::new(something));
        self
    }

    fn to_json(&self) -> String {
        serde_json::to_string_pretty(&self.0).expect("Failed to serialize samples map")
    }
}

fn to_hex(val: &Vec<u8>) -> String {
    let mut parts: Vec<String> = Vec::with_capacity(val.len());

    for byte in val {
        parts.push(format!("{:0>2x}", byte));
    }

    parts.join(" ")
}

fn create_some_time_based_trigger_isi() -> RegisterBox {
    let asset_id = AssetId::new(
        AssetDefinitionId::new("rose", "wonderland").unwrap(),
        AccountId::new("alice", "wonderland").unwrap(),
    );

    RegisterBox::new(IdentifiableBox::from(
        Trigger::new(
            "mint_rose",
            Action::new(
                Executable::from(vec![MintBox::new(1_u32, asset_id.clone()).into()]),
                Repeats::Indefinitely,
                asset_id.account_id,
                EventFilter::Time(TimeEventFilter(ExecutionTime::Schedule(
                    TimeSchedule::starting_at(Duration::from_secs(4141203402341234))
                        .with_period(Duration::from_millis(3_000)),
                ))),
            ),
        )
        .unwrap(),
    ))
}

fn create_some_event_based_trigger_isi() -> RegisterBox {
    let asset_definition_id = "rose#wonderland".parse().unwrap();
    let account_id = <Account as Identifiable>::Id::from_str("alice@wonderland").unwrap();
    let asset_id = AssetId::new(asset_definition_id, account_id.clone());
    let instruction = MintBox::new(1_u32, asset_id.clone());

    RegisterBox::new(IdentifiableBox::from(
        Trigger::new(
            "mint_rose",
            Action::new(
                Executable::from(vec![instruction.into()]),
                Repeats::Indefinitely,
                account_id,
                EventFilter::Data(BySome(EntityFilter::ByAssetDefinition(BySome(
                    AssetDefinitionFilter::new(
                        AcceptAll,
                        BySome(AssetDefinitionEventFilter::ByCreated),
                    ),
                )))),
            ),
        )
        .unwrap(),
    ))
}
