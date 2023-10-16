use iroha_data_model::prelude::*;
use parity_scale_codec::Encode;
use serde::Serialize;
use std::collections::BTreeMap;
use std::fmt::Debug;
use std::str::FromStr;
use std::time::Duration;

fn main() {
    println!(
        "{}",
        SamplesMap::new()
            .add("DomainId", &DomainId::from_str("Hey").unwrap())
            .add(
                "AssetDefinitionId",
                &AssetDefinitionId::from_str("rose#wonderland").unwrap(),
            )
            .add(
                "AccountId",
                &AccountId::from_str("alice@wonderland").unwrap(),
            )
            .add(
                "Time-based Trigger ISI",
                &create_some_time_based_trigger_isi(),
            )
            .add(
                "Event-based Trigger ISI",
                &create_some_event_based_trigger_isi(),
            )
            .add("Metadata", &create_metadata())
            .to_json()
    );
}

#[derive(Debug, Serialize)]
struct Sample {
    /// TODO replace with json-encoded form?
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

struct SamplesMap(BTreeMap<String, Sample>);

impl SamplesMap {
    fn new() -> Self {
        Self(BTreeMap::new())
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

fn create_some_time_based_trigger_isi() -> RegisterExpr {
    let asset_id = AssetId::new(
        AssetDefinitionId::from_str("rose#wonderland").unwrap(),
        AccountId::from_str("alice@wonderland").unwrap(),
    );

    let mint: InstructionExpr = MintExpr::new(1_u32, asset_id.clone()).into();

    RegisterExpr::new(Trigger::new(
        "mint_rose".parse().expect("valid"),
        Action::new(
            vec![mint],
            Repeats::Indefinitely,
            asset_id.account_id().clone(),
            TriggeringFilterBox::Time(TimeEventFilter::new(ExecutionTime::Schedule(
                TimeSchedule::starting_at(Duration::from_secs(4141203402341234))
                    .with_period(Duration::from_millis(3_000)),
            ))),
        ),
    ))
}

fn create_some_event_based_trigger_isi() -> RegisterExpr {
    let asset_definition_id = "rose#wonderland".parse().unwrap();
    let account_id = <Account as Identifiable>::Id::from_str("alice@wonderland").unwrap();
    let asset_id = AssetId::new(asset_definition_id, account_id.clone());
    let mint: InstructionExpr = MintExpr::new(1_u32, asset_id.clone()).into();

    RegisterExpr::new(Trigger::new(
        "mint_rose".parse().expect("valid"),
        Action::new(
            vec![mint],
            Repeats::Indefinitely,
            account_id,
            TriggeringFilterBox::Data(BySome(DataEntityFilter::ByAssetDefinition(BySome(
                AssetDefinitionFilter::new(
                    AcceptAll,
                    BySome(AssetDefinitionEventFilter::ByCreated),
                ),
            )))),
        ),
    ))
}

fn create_metadata() -> Metadata {
    trait LocalSet {
        fn set(self, name: &str, value: Value) -> Self;
    }

    impl LocalSet for Metadata {
        fn set(mut self, name: &str, value: Value) -> Self {
            match self
                .insert_with_limits(
                    Name::from_str(name).unwrap(),
                    value,
                    iroha_data_model::metadata::Limits::new(30, 1024),
                )
                .unwrap()
            {
                None => {}
                Some(_) => panic!("unreachable"),
            };
            self
        }
    }

    Metadata::new()
        .set(
            "authentication",
            Value::String(
                "80252ad79c68c01ec8946983411ce3b7cbea21d25f68c8546c687b2a7e2505cc".to_owned(),
            ),
        )
        .set("email", Value::String("user123@mail.com".to_owned()))
        .set("salt", Value::String("ABCDEFG".to_owned()))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn dbg_trigger_isi() {
        let value = create_some_time_based_trigger_isi();

        dbg!(&value);
    }
}
