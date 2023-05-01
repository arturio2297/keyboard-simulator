package com.backend.service.storage;

import lombok.Getter;
import lombok.Setter;

import java.io.InputStream;

@Getter@Setter
public class ReplaceObjectArgs {
    private String bucket;
    private InputStream is;
    private long size;
    private String contentType;
    private String object;

    public static Builder builder() {
        return new ReplaceObjectArgs.Builder();
    }

    public static class Builder {
        private final ReplaceObjectArgs args = new ReplaceObjectArgs();

        public Builder bucket(String bucket) {
            this.args.setBucket(bucket);
            return this;
        }

        public Builder is(InputStream is) {
            this.args.setIs(is);
            return this;
        }

        public Builder size(long size) {
            this.args.setSize(size);
            return this;
        }

        public Builder contentType(String contentType) {
            this.args.setContentType(contentType);
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