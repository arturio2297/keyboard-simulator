package com.backend.service.storage;

import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class DeleteObjectArgs {
    private String bucket;
    private String object;

    public static class Builder {
        private final ReplaceObjectArgs args = new ReplaceObjectArgs();

        public Builder bucket(String bucket) {
            this.args.setBucket(bucket);
            return this;
        }

        public Builder object(String object) {
            this.args.setObject(object);
            return this;
        }

        public ReplaceObjectArgs build() {
            return this.args;
        }
    }
}
